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
      // startDate is not used right now
      if (error) {
        done(error, null, null);
      } else if (startDate) {
        const daySeconds = 86400; // seconds in day
        var timeLast; // last song synced time in unix time

        axios.get('http://ws.audioscrobbler.com/2.0/', {
          params: {
            method: 'user.getrecenttracks',
            limit: 200,
            user: user.datastreams.lastfm.username,
            api_key: config.lastfm.clientID,
            format: 'json',
          },
        }).then(function (streamRes) {
          console.log('made it to response');
          console.log(streamRes);

          // function to create new day data object
          var newDayData = function (date, val) {
            return { dateTime: date, value: val };
          };

          // look at last day in existing data if it exists and re-count that day's tracks played
          if (user.datastreams.lastfm.features[0].data.length != 0) {
            var existingDataLength = user.datastreams.lastfm.features[0].data.length;
            console.log(existingDataLength);
            console.log(user.datastreams.lastfm.features[0].data[existingDataLength - 1].dateTime);
            timeLast = Math.floor(new Date(user.datastreams.lastfm.features[0].data[existingDataLength - 1].dateTime).getTime() / 1000); // unix timestamp of the last dateTime in seconds
          // or else track from beginning of 200 recent tracks
          } else {
            timeLast = streamRes.data.recenttracks.track[streamRes.data.recenttracks.track.length - 1].date.uts;
          }

          // initialize newData array
          var newData = [];

          // store tracks played by day as counts in newData object
          for (var i = streamRes.data.recenttracks.track.length - 1; i >= 0; i--) {
            var currentDay = newDayData(moment(timeLast * 1000).format('YYYY-MM-DD'), 0);

            // do not include now playing track
            if (streamRes.data.recenttracks.track[i].date != null) {
              var timeThisTrack = streamRes.data.recenttracks.track[i].date.uts;

              if (timeThisTrack > timeLast) {
                if (timeThisTrack <= timeLast + daySeconds) {
                  currentDay.value++;
                } else {
                  timeLast = Math.floor(timeLast / daySeconds) * daySeconds + daySeconds;
                  newData.push(newDayData(moment(timeLast * 1000).format('YYYY-MM-DD'), 1));
                }
              }
            }
          }

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
