var moment = require('moment');
var axios = require('axios');
var apiURLs = require('../../routes/resources/apiURLs');
var config = require('../../config/config');
var util = require('./util');

var lastfmAPI = {
  connect: function (passport) {
    return passport.authenticate('lastfm');
  },

  sync: function (user, done) {
    var initSyncDone = function (error, startDate) {
      if (error) {
        done(error, null, null);
      } else if (startDate) {
        var dateToday = moment().format('YYYY-MM-DD');
        const dateTimeToday = new Date(dateToday).getTime(); // unix timestamp of that date
        const timeStampTwoDaysAgo = Math.floor(dateTimeToday / 1000) - 86400 * 2; // in unix seconds
        const addDay = 86400; // seconds in day

        axios.get(apiURLs.lastfm.rootURL, {
          params: {
            method: 'user.getrecenttracks',
            from: timeStampTwoDaysAgo,
            limit: 200,
            user: user.datastreams.lastfm,
            api_key: config.lastfm.clientID,
            format: 'json',
          },
        }).then(function (streamRes) {
          console.log('made it to response');
          console.log('is this updating?');

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
          console.log('for loop start');
          console.log(streamRes);

          // store tracks played by day as counts in newData object
          for (var i = streamRes.data.recenttracks.track.length - 1; i >= 0; i--) {
            var currentDay = newData[newData.length - 1];
            console.log(i);
            console.log(streamRes.data.recenttracks.track[i]);

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

          console.log(newData);
          util.addDataToUser(user, 'Tracks Played', 'lastfm', newData, done);
        }).catch(function (error) {
          if (error.status == 401) {
            console.log('access token expired, redirecting to OAuth...');
            done(null, null, true);
          } else {
            done(error.data.errors, null, null);
          }
        });
      }
    };

    util.initSync(user, 'Tracks Played', 'lastfm', initSyncDone);
  },

};

module.exports = lastfmAPI;

