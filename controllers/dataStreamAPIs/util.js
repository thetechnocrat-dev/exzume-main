Feature = require('../../models/feature');
var async = require('async');

// non exported helper functions
helper = {
  // function to add user to feature users array, callback is part of async series
  addUserToFeature: function (userName, featureName, callback) {
    Feature.findOne({ name: featureName }, function (err, feature) {
      if (err) {
        callback(err, null);
      } else if (feature.users.includes(userName)) {
        console.log('user already included in feature users array');
        callback(null, feature);
      } else {
        feature.users.push(userName);
        feature.save(function (err, feature) {
          if (err) {
            console.log('error saving feature: ', err);
            callback(err, null);
          } else if (feature) {
            callback(null, feature);
          }
        });
      }
    });
  },

  // function to initialize user feature arrau with given featureName
  initUserFeatureArr: function (user, featureName, streamName, callback) {
    var currentStream = user.datastreams[streamName];

    // check if user already has initialized userFeature
    var featureExists = false;
    for (feature in currentStream.features) {
      if (currentStream.features[feature].name == featureName) featureExists = true;
    }

    if (featureExists) {
      console.log('user dataStreams features array already contains feature');
      callback(null, user);
    } else {
      currentStream.features.push({ name: featureName });
      user.save(function (err, user) {
        if (err) {
          console.log('error saving user: ', err);
          callback(err, null);
        } else if (user) {
          callback(null, user);
        }
      });
    }
  },

  // function to add current data as object to user.datastreams.features array
  addDataToUser: function (user, featureName, streamName, newData, callback) {
    var currentStream = user.datastreams[streamName];

    // find proper feature index within users datastream object
    var thisFeatureIndex;
    for (var i = 0; i < currentStream.features.length; i++) {
      if (currentStream.features[i].name == featureName) {
        thisFeatureIndex = i;
      }
    };

    var thisFeature = currentStream.features[thisFeatureIndex];
    for (var i = 0; i < newData.length; i++) {
      thisFeature.data.push(newData[i]);
    };

    user.save(function (err, user) {
      if (err) {
        console.log('error saving user', err);
        callback(err, null);
      } else if (user) {
        callback(null, user);
      }
    });
  },

};

// exported util functions
util = {
  // basic flow of initilizing a user feature and/or adding data to a user feature
  syncStepFlow: function (res, streamRes, user, featureName, streamName, newData) {
    console.log('in refactored step');
    async.series({
      one: function (callback) {
        helper.addUserToFeature(user.local.username, featureName, callback);
      },

      two: function (callback) {
        helper.initUserFeatureArr(user, featureName, streamName, callback);
      },

      three: function (callback) {
        helper.addDataToUser(user, featureName, streamName, newData, callback);
      },
    }, function (err, results) {
      if (err) res.send(err);
      else {
        res.redirect('/#/dashboard?=');
      }
    });
  },

  // returns start data for API's to sync from
  findStartDate: function (timeSeries, blankFlag) {
    // if time series is empty flag to return the max amount of data possible
    if (timeSeries.length === 0) return ('max');

    // find the latest non-blank entry
    var revTimeSeries = timeSeries.slice(0).reverse();
    for (var i = 0; i < timeSeries.length; i++) {
      var dateTime = revTimeSeries[i].dateTime;
      var value = revTimeSeries[i].value;

      if (value !== blankFlag) {
        return dateTime;
      }
    };

    // handles case of all blank flags
    return timeSeries[0].dateTime;
  },

};

module.exports = util;
