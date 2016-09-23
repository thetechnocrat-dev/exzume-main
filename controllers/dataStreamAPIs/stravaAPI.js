var util = require('./util');
var axios = require('axios');
var async = require('async');

// // if user stream doesn't contain feature array doesn't exist it will init it
// var prepUserFeatureArr = function (user, featureName, streamName) {
//   var currentStream = user.datastreams[streamName];
//
//   // check if user already has initialized userFeature
//   var featureExists = false;
//   for (var i = 0; i < currentStream.features.length; i++) {
//     if (currentStream.features[i].name == featureName) {
//       featureExists = true;
//     }
//   }
//
//   if (!featureExists) {
//     currentStream.features.push({ name: featureName });
//     user.save(function (err, user) {
//       if (err) {
//         res.send(err);
//       }
//     });
//   };
// };

var preSync = function (user, featureNameArray, streamName, startSync) {
  console.log('inside strava presync');

  // if user stream doesn't contain feature array doesn't exist it will init it
  var prepUserFeatureArr = function (user, featureNameArray, streamName, startSync) {
    console.log('inside prepUserFeatureArr');
    var shouldSaveUser = false;
    var currentStream = user.datastreams[streamName];

    for (idx in featureNameArray) {
      var featureName = featureNameArray[idx];

      // check if user already has initialized userFeature
      var featureExists = false;
      for (var i = 0; i < currentStream.features.length; i++) {
        if (currentStream.features[i].name == featureName) {
          featureExists = true;
        }
      }

      if (!featureExists) {
        currentStream.features.push({ name: featureName });
        shouldSaveUser = true;
      }
    }

    if (shouldSaveUser) {
      startSync(null);
    } else {
      user.save(function (err, user) {
        if (err) {
          startSync(err);
        } else if (user) {
          startSync(null);
        }
      });
    }
  };

  prepUserFeatureArr(user, featureNameArray, streamName, startSync);
};

var stravaAPI = {
  connect: function (passport) {
    return passport.authenticate('strava', { scope: ['public'] });
  },

  sync: function (user, endSync) {
    var processData = function (newData) {
      var typeArr = [];
      var distanceArr = [];
      var movingTimeArr = [];
      var dataArrs = [typeArr, distanceArr, movingTimeArr];

      // data is pulled reverse chronologically, so start from end of array and sync backwards
      for (var i = newData.length - 1; i > 0; i--) {
        typeArr.push({ dateTime: newData[i].start_date_local,
                        value: newData[i].type, });
        distanceArr.push({ dateTime: newData[i].start_date_local,
                        value: newData[i].distance, });
        movingTimeArr.push({ dateTime: newData[i].start_date_local,
                        value: newData[i].moving_time, });
      }

      return dataArrs;
    };

    async.series([
      function (nextSync) {
        console.log('inside strava async series function');
        var featureNameArray = ['Type', 'Distance', 'Moving Time'];
        preSync(user, featureNameArray, 'strava', function (err) {
          console.log('inside strava startSync');
          if (err) {
            nextSync(err, null);
          } else {
            console.log('about to axios call');
            axios({
              method: 'GET',
              url: 'https://www.strava.com/api/v3/athlete/activities',
              headers: { Authorization: 'Bearer ' + user.datastreams.strava.accessToken },
              // params: {}
            }).then(function (streamRes) {
              console.log('made it to response');
              console.log(streamRes);
              var processedDataArr = processData(streamRes.data);
              var featureNames = ['Type', 'Distance', 'Moving Time'];
              util.addMuchDataToUser(user, featureNames, 'strava', processedDataArr, nextSync);
            }).catch(function (err) {
              console.log('axios error');
              if (err) {
                nextSync(err, null);
              }
            });
          }
        });

      },
    ], function (err, results) {
      console.log('async callback');
      console.log(results[0].toString());
      if (err) {
        endSync(err, null, null);
      } else {
        endSync(null, results[results.length - 1], null);
      }
    });

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
