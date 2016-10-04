var config = require('../../config/config');
var util = require('./util');
var axios = require('axios');
var async = require('async');
var moment = require('moment');

// checks to see if user needs added to feature and if user feature array is initialized
var preSync = function (user, featureName, streamName, startSync) {
  // if user stream doesn't contain feature array doesn't exist it will init it
  var prepUserFeatureArr = function (user, featureName, streamName, startSync) {
    var currentStream = user.datastreams[streamName];

    // check if user already has initialized userFeature
    var featureExists = false;
    for (var i = 0; i < currentStream.features.length; i++) {
      if (currentStream.features[i].name == featureName) {
        featureExists = true;
      }
    }

    if (featureExists) {
      startSync(null);
    } else {
      currentStream.features.push({ name: featureName });
      user.save(function (err, user) {
        if (err) {
          startSync(err);
        } else if (user) {
          startSync(null);
        }
      });
    }
  };

  prepUserFeatureArr(user, featureName, streamName, startSync);
};

var lastfmAPI = {
  connect: function (passport) {
    return passport.authenticate('lastfm');
  },

  sync: function (user, endSync) {
    var processTracksData = function (newData) {
      // initialize newData array
      var processedData = [];

      // function to create new day data object
      var newDayData = function (date, val) {
        return { dateTime: date, value: val };
      };

      const daySeconds = 86400; // seconds in day
      var lastSongTime;// last song synced time in unix time

      // case 1: use lastSongTime from DB
      if (user.datastreams.lastfm.lastSongTime) {
        // unix timestamp of the last dateTime in seconds
        lastSongTime = user.datastreams.lastfm.lastSongTime;

        // find beginning of day (locally) for that last song, start putting in buckets from there
        timeLastDay = Math.floor((lastSongTime + user.timezoneOffset / 1000) / daySeconds) * daySeconds;
      // case 2: track from beginning of 1200 recent tracks
      } else {
        lastSongTime = parseInt(newData[newData.length - 1].date.uts);
        console.log('start here: ' + lastSongTime);

        timeLastDay = Math.floor(lastSongTime / daySeconds) * daySeconds + user.timezoneOffset / 1000;
        console.log('start here: ' + moment(timeLastDay * 1000).format('YYYY-MM-DD'));
      }

      var currentDay = newDayData(moment(timeLastDay * 1000).format('YYYY-MM-DD'), 0);

      // store tracks played by day as counts in newData object
      for (var i = newData.length - 1; i >= 0; i--) {
        // do not include now playing track
        if (newData[i].date != null) {
          var timeThisTrack = parseInt(newData[i].date.uts);
          console.log(timeThisTrack);

          if (timeThisTrack > lastSongTime) {
            if (moment(timeThisTrack * 1000).isSame(moment(timeLastDay * 1000), 'day')) {
              currentDay.value++;
              console.log(currentDay.value);
            } else {
              console.log(currentDay.dateTime);
              console.log(currentDay.value);
              processedData.push(currentDay);

              // set new timeLastDay to beginning of next day
              timeLastDay += daySeconds;
              currentDay = newDayData(moment(timeLastDay * 1000).format('YYYY-MM-DD'), 1);
            }
          }
        }

        //   if (i = 0) {
        //     lastSongTime = newData[0].date.uts;
        //   }
        // } else {
        //   lastSongTime = newData[1].date.uts;
        // }
      }

      // if (!user.datastreams.lastfm.lastSongTime ||
      //     user.datastreams.lastfm.lastSongTime < lastSongTime) {
      //   user.datastreams.lastfm.lastSongTime = lastSongTime;
      //   user.save(function (err) {
      //     if (err) {
      //       console.log('error in saving user: ' + err);
      //       throw err;
      //     }
      //   });
      // }

      console.log(currentDay.dateTime);
      console.log(currentDay.value);
      processedData.push(currentDay);
      return processedData;
    };

    var resources = [6, 5, 4, 3, 2, 1];
    var series = resources.map(function (resource) {
      return (
        function (nextSync) {
          preSync(user, 'Tracks Played', 'lastfm', function (err) {
            // timeLast is not used right now
            if (err) {
              nextSync(err, null);
            } else {
              // make axios call before calling processTracksData
              axios.get('http://ws.audioscrobbler.com/2.0/', {
                params: {
                  method: 'user.getrecenttracks',
                  limit: 200,
                  user: user.datastreams.lastfm.username,
                  api_key: config.lastfm.clientID,
                  format: 'json',
                  page: resource,
                },
              }).then(function (streamRes) {
                console.log('made it to response');
                console.log(streamRes);
                console.log(streamRes.data.recenttracks.track);
                var processedData = processTracksData(streamRes.data.recenttracks.track);
                util.addDataToUser(user, 'Tracks Played', 'lastfm', processedData, nextSync);
              }).catch(function (err) {
                if (err.status == 401) {
                  console.log('access token expired, redirecting to OAuth...');
                  nextSync('redirect', null);
                } else {
                  nextSync(err.data.errors, null);
                }
              });
            }
          });
        }
      );
    });

    async.series(series, function (err, results) {
      if (err === 'redirect') {
        console.log('redirect');
        endSync(null, null, true);
      } else if (err) {
        console.log('2 axios error');
        endSync(err, null, null);
      } else {
        // second argument is last results.lastSeriesCallName is the user object
        console.log(results);
        endSync(null, results[results.length - 1], null);
      }
    });
  },

};

module.exports = lastfmAPI;
