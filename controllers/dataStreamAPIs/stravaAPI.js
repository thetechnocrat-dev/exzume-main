var util = require('./util');
var axios = require('axios');
var async = require('async');

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

var stravaAPI = {
  connect: function (passport) {
    return passport.authenticate('strava', { scope: ['public'] });
  },

  sync: function (user, endSync) {
    // var processTracksData = function (newData) {
    //   // initialize newData array
    //   var processedData = [];
    //
    //   // function to create new day data object
    //   var newDayData = function (date, val) {
    //     return { dateTime: date, value: val };
    //   };
    //
    //   const daySeconds = 86400; // seconds in day
    //   var lastSongTime;// last song synced time in unix time
    //
    //   // case 1: use lastSongTime from DB
    //   if (user.datastreams.lastfm.lastSongTime) {
    //     lastSongTime = user.datastreams.lastfm.lastSongTime;
    //
    //     // unix timestamp of the last dateTime in seconds
    //     timeLastDay = Math.floor(lastSongTime / daySeconds) * daySeconds;
    //     // timeLastDay = Math.floor(new Date(user.datastreams.lastfm.features[0].data[existingDataLength - 1].dateTime).getTime() / 1000);
    //   // case 2: track from beginning of 200 recent tracks
    //   } else {
    //     lastSongTime = newData[newData.length - 1].date.uts;
    //     console.log('start here: ' + lastSongTime);
    //
    //     timeLastDay = Math.floor(lastSongTime / daySeconds) * daySeconds;
    //     console.log('start here: ' + moment(timeLastDay * 1000).utc().format('YYYY-MM-DD'));
    //   }
    //
    //   var currentDay = newDayData(moment(timeLastDay * 1000).utc().format('YYYY-MM-DD'), 0);
    //
    //   // store tracks played by day as counts in newData object
    //   for (var i = newData.length - 1; i >= 0; i--) {
    //     // do not include now playing track
    //     if (newData[i].date != null) {
    //       var timeThisTrack = newData[i].date.uts;
    //       console.log(timeThisTrack);
    //
    //       if (timeThisTrack > timeLastDay && timeThisTrack > lastSongTime) {
    //         if (timeThisTrack <= timeLastDay + daySeconds) {
    //           currentDay.value++;
    //           console.log(currentDay.value);
    //         } else {
    //           console.log(currentDay.dateTime);
    //           console.log(currentDay.value);
    //           processedData.push(currentDay);
    //
    //           // set new timeLastDay to beginning of next day
    //           timeLastDay = Math.floor(timeLastDay / daySeconds) * daySeconds + daySeconds;
    //           currentDay = newDayData(moment(timeLastDay * 1000).utc().format('YYYY-MM-DD'), 1);
    //         }
    //       }
    //     }
    //   }
    //
    //   console.log(currentDay.dateTime);
    //   console.log(currentDay.value);
    //   processedData.push(currentDay);
    //   return processedData;
    // };
    var processStravaData = function (newData) {

    };

    var resourceNames = ['Type', 'Distance', 'Moving Time'];
    // var series = resourceNames.map(function (resourceName) {
    //   return (
    //     function (nextSync) {
    //       preSync(user, 'Tracks Played', 'lastfm', function (err) {
    //         if (err) {
    //           nextSync(err, null);
    //         } else {
          // make axios call before calling processTracksData
              axios({
                method: 'GET',
                url: 'https://www.strava.com/api/v3/athlete/activities',
                headers: { Authorization: 'Bearer ' + user.datastreams.strava.accessToken },
                // params: {}
              }).then(function (streamRes) {
                console.log('made it to response');
                console.log(streamRes);
                endSync(null, user, false); // nextSync
                // var processedData = processStravaData(streamRes.data);
                // util.addDataToUser(user, 'Tracks Played', 'lastfm', processedData, nextSync);
              }).catch(function (err) {
                if (err.status == 401) {
                  console.log('access token expired, redirecting to OAuth...');
                  // nextSync('redirect', null);
                  endSync(err, null, null);
                } else {
                  endSync(err, null, null);
                  // nextSync(err.data.errors, null);
                }
              });
    //         }
    //       });
    //     }
    //   );
    // });

    // async.series(series, function (err, results) {
    //   if (err === 'redirect') {
    //     console.log('redirect');
    //     endSync(null, null, true);
    //   } else if (err) {
    //     console.log('2 axios error');
    //     endSync(err, null, null);
    //   } else {
    //     // second argument is last results.lastSeriesCallName is the user object
    //     console.log(results);
    //     endSync(null, results[results.length - 1], null);
    //   }
    // });
  },

};

module.exports = stravaAPI;
