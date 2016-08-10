var moment = require('moment');
var axios = require('axios');
var apiURLs = require('../../routes/resources/apiURLs');
var config = require('../../config/config');
var util = require('./util');

var lastfmAPI = {
  connect: function (passport) {
    return passport.authenticate('lastfm');
  },

  sync: function (res, user) {
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
    }).then(function (streamRes) {
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
      for (var i = streamRes.data.recenttracks.track.length - 1; i >= 0; i--) {
        var currentDay = newData[newData.length - 1];

        // do not include now playing track
        if (streamRes.data.recenttracks.track[i].date != null) {
          var timeThisTrack = streamRes.data.recenttracks.track[i].date.uts;

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

      util.syncStepFlow(res, streamRes, user, 'Tracks Played', 'lastfm', newData);

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
