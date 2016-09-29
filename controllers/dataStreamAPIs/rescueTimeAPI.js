var util = require('./util');
var axios = require('axios');
var async = require('async');
var config = require('../../config/config');

var preSync = function (user, featureNameArray, streamName, startSync) {
  console.log('inside rescue time presync');

  // if user stream doesn't contain feature array doesn't exist it will init it
  var prepUserFeatureArr = function (user, featureNameArray, streamName, startSync) {
    console.log('inside prepUserFeatureArr');
    var currentStream = user.datastreams[streamName];
    var startDate;

    for (idx in featureNameArray) {
      var featureName = featureNameArray[idx];

      // check if user already has initialized userFeature
      var featureExists = false;
      var timeSeries;

      // get start date for API's to sync from
      for (var i = 0; i < currentStream.features.length; i++) {
        if (currentStream.features[i].name == featureName) {
          featureExists = true;
          timeSeries = currentStream.features[i].data;
          startDate = timeSeries[timeSeries.length - 1].dateTime;
        }
      }

      if (!featureExists) {
        currentStream.features.push({ name: featureName });
      }
    }

    if (startDate == null) {
      startSync(null, '1m');
    } else {
      user.save(function (err, user) {
        if (err) {
          startSync(err, null);
        } else if (user) {
          startSync(null, startDate);
        }
      });
    }
  };

  prepUserFeatureArr(user, featureNameArray, streamName, startSync);
};

var rescueTimeAPI = {
  connect: function () {
    return function (req, res, next) {
      console.log('rescue time redirect');
      res.redirect('https://www.rescuetime.com/oauth/authorize/?response_type=code&' +
          'redirect_uri=' + encodeURIComponent(config.rescueTime.callbackURL) +
          '&scope=time_data%20category_data%20productivity_data&' +
          'client_id=' + config.rescueTime.clientID);
    };
  },

  sync: function (user, endSync, isInitialSync) {
    console.log('in rescue time sync');
    var dateToday = moment().format('YYYY-MM-DD');
    // var processHistData = function (newData) {
    //   var productiveHours = [];
    //   var neutralHours = [];
    //   var distractingHours = [];
    //
    //   // data is pulled reverse chronologically, so start from end of array and sync backwards
    //   for (var i = newData.length - 1; i > 0; i--) {
    //     productiveHours.push({
    //       dateTime: newData[i].date,
    //       value: newData[i].all_productive_hours,
    //     });
    //     neutralHours.push({
    //       dateTime: newData[i].date,
    //       value: newData[i].neutral_hours,
    //     });
    //     distractingHours.push({
    //       dateTime: newData[i].date,
    //       value: newData[i].all_distracting_hours,
    //     });
    //   }
    //
    //   return [productiveHours, neutralHours, distractingHours];
    // };

    var processDailyData = function (newData) {
      var productiveHours = [];
      var neutralHours = [];
      var distractingHours = [];
      var productiveSecs = 0;
      var neutralSecs = 0;
      var distractingSecs = 0;

      for (var i = 0; i < newData.length; i++) {
        if (newData[i][3] > 0) {
          productiveSecs += newData[i][1];
        } else if (newData[i][3] == 0) {
          neturalSecs += newData[i][1];
        } else {
          distractingSecs += newData[i][1];
        }
      }

      productiveHours.push({
        dateTime: dateToday,
        value: productiveSecs / 3600,
      });
      neutralHours.push({
        dateTime: dateToday,
        value: neutralSecs / 3600,
      });
      distractingHours.push({
        dateTime: dateToday,
        value: distractingSecs / 3600,
      });

      return [productiveHours, neutralHours, distractingHours];
    };

    var series = [

      // initial Sync function
      // function (nextSync) {
      //   console.log('inside rescuetime async series function');
      //   var featureNameArray = [
      //     'Computer Productivity (Hours)',
      //     'Computer Neutral (Hours)',
      //     'Computer Distractivity (Hours)',
      //   ];
      //   preSync(user, featureNameArray, 'rescuetime', function (err) {
      //     console.log('inside rescuetime startSync');
      //     if (err) {
      //       nextSync(err, null);
      //     } else {
      //       console.log('about to axios call');
      //       console.log(user.datastreams.rescuetime);
      //       axios.get('https://www.rescuetime.com/api/oauth/daily_summary_feed', {
      //         params: {
      //           access_token: user.datastreams.rescuetime.accessToken,
      //           format: 'json',
      //         },
      //       }).then(function (streamRes) {
      //         console.log('made it to axios rescuetime axios then call');
      //         var processedDataArray = processHistData(streamRes.data.rows);
      //         var featureNameArray = [
      //           'Computer Productivity (Hours)',
      //           'Computer Neutral (Hours)',
      //           'Computer Distractivity (Hours)',
      //         ];
      //         util.addMuchDataToUser(
      //           user, featureNameArray, 'rescuetime', processedDataArray, nextSync
      //         );
      //       }).catch(function (err) {
      //         console.log('axios error');
      //         if (err) {
      //           nextSync(err, null);
      //         }
      //       });
      //     }
      //   });
      // },

      // daily sync function
      function (nextSync) {
        console.log('inside rescuetime async series function');
        var featureNameArray = [
          'Computer Productivity (Hours)',
          'Computer Neutral (Hours)',
          'Computer Distractivity (Hours)',
        ];
        preSync(user, featureNameArray, 'rescuetime', function (err) {
          console.log('inside rescuetime startSync');
          if (err) {
            nextSync(err, null);
          } else {
            console.log('about to axios call');
            console.log(user.datastreams.rescuetime);
            axios.get('https://www.rescuetime.com/api/oauth/data', {
              params: {
                access_token: user.datastreams.rescuetime.accessToken,
                format: 'json',
                restrict_kind: 'productivity',
                restrict_begin: dateToday,
                restrict_end: dateToday,
              },
            }).then(function (streamRes, dateToday) {
              console.log('made it to axios rescuetime axios then call');
              var processedDataArray = processDailyData(streamRes.data, dateToday);
              var featureNameArray = [
                'Computer Productivity (Hours)',
                'Computer Neutral (Hours)',
                'Computer Distractivity (Hours)',
              ];
              util.addMuchDataToUser(
                user, featureNameArray, 'rescuetime', processedDataArray, nextSync
              );
            }).catch(function (err) {
              console.log('axios error');
              if (err) {
                nextSync(err, null);
              }
            });
          }
        });
      },
    ];

    async.series(series, function (err, results) {
        console.log('async callback');
        console.log(results[0].toString());
        if (err) {
          endSync(err, null, null);
        } else {
          endSync(null, results[results.length - 1], null);
        }
      });
  },

};

module.exports = rescueTimeAPI;
