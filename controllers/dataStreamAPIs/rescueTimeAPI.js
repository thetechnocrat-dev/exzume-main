var util = require('./util');
var axios = require('axios');
var async = require('async');
var moment = require('moment');
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
      startSync(null, moment().subtract(1, 'month').format('YYYY-MM-DD'));
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

  sync: function (user, endSync) {
    console.log('in rescue time sync');

    var processData = function (newData, startDate) {
      var productiveHours = [];
      var neutralHours = [];
      var distractingHours = [];
      var productiveSecs = 0;
      var neutralSecs = 0;
      var distractingSecs = 0;
      console.log('in processData');
      console.log(startDate);

      // find first date in response
      while (startDate != newData[0][0].slice(0, 10)) {
        if (moment(startDate, 'YYYY-MM-DD') < moment(newData[j][0].slice(0, 10), 'YYYY-MM-DD')) {
          startDate = moment(startDate, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
        }
      }

      var thisDate = startDate;

      // loop through rest of rows of data
      for (var i = 0; i < newData.length; i++) {
        console.log(thisDate);
        if (newData[i][0].slice(0, 10) == thisDate) {
          if (newData[i][3] > 0) {
            productiveSecs += newData[i][1];
          } else if (newData[i][3] == 0) {
            neutralSecs += newData[i][1];
          } else {
            distractingSecs += newData[i][1];
          }
        } else {
          productiveHours.push({
            dateTime: thisDate,
            value: productiveSecs / 3600,
          });
          neutralHours.push({
            dateTime: thisDate,
            value: neutralSecs / 3600,
          });
          distractingHours.push({
            dateTime: thisDate,
            value: distractingSecs / 3600,
          });
          var thisDate = moment(newData[i][0].slice(0, 10), 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
          if (newData[i][3] > 0) {
            productiveSecs = newData[i][1];
            neutralSecs = 0;
            distractingSecs = 0;
          } else if (newData[i][3] == 0) {
            productiveSecs = 0;
            neutralSecs = newData[i][1];
            distractingSecs = 0;
          } else {
            productiveSecs = 0;
            neutralSecs = 0;
            distractingSecs = newData[i][1];
          }
        }
      };

      productiveHours.push({
        dateTime: thisDate,
        value: productiveSecs / 3600,
      });
      neutralHours.push({
        dateTime: thisDate,
        value: neutralSecs / 3600,
      });
      distractingHours.push({
        dateTime: thisDate,
        value: distractingSecs / 3600,
      });

      return [productiveHours, neutralHours, distractingHours];
    };

    async.series([
      function (nextSync) {
        console.log('inside rescuetime async series function');
        var featureNameArray = [
          'Computer Productivity (Hours)',
          'Computer Neutral (Hours)',
          'Computer Distractivity (Hours)',
        ];
        preSync(user, featureNameArray, 'rescuetime', function (err, startDate) {
          console.log('inside rescuetime startSync');
          if (err) {
            nextSync(err, null);
          } else {
            var endDate = moment().format('YYYY-MM-DD');
            console.log('about to axios call');
            console.log(user.datastreams.rescuetime);
            axios.get('https://www.rescuetime.com/api/oauth/data', {
              params: {
                access_token: user.datastreams.rescuetime.accessToken,
                format: 'json',
                restrict_kind: 'productivity',
                restrict_begin: startDate,
                restrict_end: endDate,
                resolution_time: 'day',
                perspective: 'interval',
              },
            }).then(function (streamRes) {
              console.log('made it to axios rescuetime axios then call');
              console.log(streamRes.data);
              console.log(streamRes.data.rows);
              var processedDataArray = processData(streamRes.data.rows, startDate);
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
    ], function (err, results) {
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
