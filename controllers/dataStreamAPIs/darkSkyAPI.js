var util = require('./util');
var axios = require('axios');
var async = require('async');

var preSync = function (user, featureNameArray, streamName, startSync) {
  console.log('inside darksky presync');

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

var darkSkyAPI = {
  connect: function () {
    return function (req, res, next) {
      console.log('in darksky connect');
      res.redirect('/auth/datastreams/darksky/grab?isInitialSync=true');
    };
  },

  sync: function (user, endSync) {
    console.log('in darksky sync');
    // get long + lat!
    var processData = function (dataResp) {
      var dailyData = dataResp.daily.data;
      console.log('inside processData');
      console.log(dailyData);
      var summary = [];
      var precipProb = [];
      var precipType = [];
      var minTemp = [];
      var maxTemp = [];

      for (var i = 0; i < dailyData.length; i++) {
        summary.push({
          dateTime: dailyData[i].time,
          value: dailyData[i].summary,
        });
        precipProb.push({
          dateTime: dailyData[i].time,
          value: dailyData[i].precipProbability,
        });
        // if no precipType, use 'cloudy/sunny' icon?
        precipType.push({
          dateTime: dailyData[i].time,
          value: dailyData[i].precipType,
        });
        minTemp.push({
          dateTime: dailyData[i].time,
          value: dailyData[i].temperatureMin,
        });
        maxTemp.push({
          dateTime: dailyData[i].time,
          value: dailyData[i].temperatureMax,
        });
      }

      return [summary, precipProb, precipType, minTemp, maxTemp];
    };

    async.series([
      function (nextSync) {
        console.log('inside darksky async series function');
        var featureNameArray = [
          'Weather Summary',
          'Precipitation Probability',
          'Precipitation Type',
          'Minimum Temperature',
          'Maximum Temperature',
        ];
        preSync(user, featureNameArray, 'darksky', function (err) {
          console.log('inside darksky startSync');
          if (err) {
            nextSync(err, null);
          } else {
            console.log('about to axios call');
            console.log(user.datastreams.darksky);
            axios.get('https://api.darksky.net/forecast/17a51b74f64749f570ab28816c11884d/37.8267,-122.4233', {
              params: {
                exclude: 'currently,minutely,hourly,alerts,flags',
              },
            }).then(function (streamRes) {
              console.log('made it to darksky axios then call');
              console.log(streamRes);
              var processedDataArray = processData(streamRes.data);
              var featureNameArray = [
                'Weather Summary',
                'Precipitation Probability',
                'Precipitation Type',
                'Minimum Temperature',
                'Maximum Temperature',
              ];

              util.addMuchDataToUser(
                user, featureNameArray, 'darksky', processedDataArray, nextSync
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

module.exports = darkSkyAPI;
