var moment = require('moment');
var axios = require('axios');
var async = require('async');
var apiURLs = require('../../routes/resources/apiURLs');
var config = require('../../config/config');

var Util = require('./util');

var lastfmAPI = {
  connect: function (passport) {
    return passport.authenticate('lastfm');
  },

  sync: function (res, user) {
    console.log('refactored lastfm sync');
    var currentStream = user.datastreams.lastfm;
    var dateToday = moment().format('YYYY-MM-DD');
    const dateTimeToday = new Date(dateToday).getTime(); // unix timestamp of that date
    const timeStampTwoDaysAgo = Math.floor(dateTimeToday / 1000) - 86400 * 2; // in unix seconds
    const addDay = 86400; // seconds in day

    axios.get(apiURLs.lastfm.rootURL, {
      params: {
        method: 'user.getrecenttracks',
        from: timeStampTwoDaysAgo,
        limit: 200,
        user: currentStream.username,
        api_key: config.lastfm.clientID,
        format: 'json',
      },
    }).then(function (response) {
      console.log('made it to response');

      // function to create new day data object
      var newDayData = function (date, val) {
        var obj = {
          dateTime: date,
          value: val,
        };
        return obj;
      };

      // initialize newData array
      var newData = [newDayData(moment(timeStampTwoDaysAgo * 1000).format('YYYY-MM-DD'), 0)];
      var last = timeStampTwoDaysAgo;

      // store tracks played by day as counts in newData object
      for (var i = response.data.recenttracks.track.length - 1; i >= 0; i--) {
        var currentDay = newData[newData.length - 1];

        // do not include now playing track
        if (response.data.recenttracks.track[i].date != null) {
          var timeThisTrack = response.data.recenttracks.track[i].date.uts;

          if (timeThisTrack > last) {
            if (timeThisTrack <= last + addDay) {
              currentDay.value++;
            } else {
              last = last + addDay;
              newData.push(newDayData(moment(last * 1000).format('YYYY-MM-DD'), 1));
            }
          }
        }
      }

      async.series({
        one: function (callback) {
          Util.addUserToFeature(user.local.username, 'Tracks Played', callback);
        },

        two: function (callback) {
          Util.initUserFeatureArr(user, 'Tracks Played', 'lastfm', callback);
        },

        three: function (callback) {
          Util.addDataToUser(user, 'Tracks Played', 'lastfm', newData, callback);
        },
      }, function (err, results) {
        if (err) res.send(err);
        else {
          res.redirect('/#/dashboard?=');
        }
      });
    }).catch(function (error) {
      if (error.status == 401) {
        console.log('access token expired, refresh that shit');
        console.log('redirecting user to the authentication flow...');
        res.redirect('/auth/datastreams/lastfm');
      }

      console.log(error);
    });
  },

};

module.exports = lastfmAPI;
