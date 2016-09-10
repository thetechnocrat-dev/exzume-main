var axios = require('axios');
var async = require('async');

var preSync = function (user, featureName, streamName, startSync) {
  console.log('inside rescue time presync');

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

var rescueTimeAPI = {
  connect: function () {
    return function (req, res, next) {
      console.log('rescue time redirect');
      res.redirect('https://www.rescuetime.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2Fwww.exzume.com%2Fauth%2Fdatastreams%2Frescuetime%2Fcallback&scope=time_data%20category_data%20productivity_data&client_id=2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a');
    };
  },

  sync: function (user, endSync) {
    console.log('in rescue time sync');
    var processData = function (newData) {
      var processedData = [];
      for (var i = 0; i < newData.length; i++) {
        console.log(newData[i].date);
        console.log(newData[i].all_productive_hours);
        processHeartRateData.push({
          dateTime: newData[i].date,
          value: newData[i].all_productive_hours.toString(),
        });
      }
    };

    async.series([
      function (nextSync) {
        console.log('inside rescuetime async series function');
        preSync(user, 'Computer Productive Time', 'rescuetime', function (err) {
          console.log('inside rescueTime startSync');
          if (err) {
            nextSync(err, null);
          } else {
            axios.get('https://www.rescuetime.com/api/oauth/daily_summary_feed', {
              params: {
                access_token: user.datastreams.rescuetime.accessToken,
                format: 'json',
              },
            }).then(function (streamRes) {
              console.log('made it to axios rescuetime axios then call');
              var processedData = processData(streamRes.data);
              util.addDataToUser(
                user, 'Computer Produvtive Time', 'rescuetime', processedData, nextSync
              );
            }).catch(function (err) {
              if (err) {
                nextSync(err.data.errors, null);
              }
            });
          }
        });
      },
      ], function (err, results) {
        if (err) {
          endSync(err, null, null);
        } else {
          endSync(null, results[results.length - 1], null);
        }
      });
  },

};

module.exports = rescueTimeAPI;

