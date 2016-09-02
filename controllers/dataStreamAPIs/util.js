Feature = require('../../models/feature');

// non exported helper functions
helper = {
  // function to add user to feature users array
  // addUserToFeature: function (userName, featureName, initSyncDone) {
  //   Feature.findOne({ name: featureName }, function (err, feature) {
  //     if (err) {
  //       console.log(err);
  //     } else if (feature.users.includes(userName)) {
  //       console.log('user already included in feature users array');
  //     } else {
  //       feature.users.push(userName);
  //       feature.save(function (err, feature) {
  //         if (err) {
  //           console.log('error saving feature: ', err);
  //         } else if (feature) {
  //           console.log('user added to ' + featureName + ' feature');
  //         }
  //       });
  //     }
  //   });
  // },

  // if userFeature array doesn't it exist it will init it and return max,
  // else it returns the date to sync from
  handleUserFeatureArr: function (user, featureName, streamName, initSyncDone, options) {
    var options = typeof options !== 'undefined' ? options : {};
    var blankFlag = options.blankFlag || null;

    var currentStream = user.datastreams[streamName];

    // check if user already has initialized userFeature
    var featureExists = false;
    var timeSeries;
    for (var i = 0; i < currentStream.features.length; i++) {
      if (currentStream.features[i].name == featureName) {
        featureExists = true;
        timeSeries = currentStream.features[i].data;
      }
    }

    if (featureExists) {
      // returns start data for API's to sync from
      if (timeSeries.length === 0) {
        initSyncDone(null, 'max');
        return;
      }

      // find the latest non-blank entry
      var revTimeSeries = timeSeries.slice(0).reverse();
      for (var i = 0; i < timeSeries.length; i++) {
        var dateTime = revTimeSeries[i].dateTime;
        var value = revTimeSeries[i].value;
        if (value != blankFlag) {
          initSyncDone(null, dateTime);
          return;
        }
      };

      // handles case of all blank flags
      initSyncDone(null, timeSeries[0].dateTime);
    } else {
      currentStream.features.push({ name: featureName });
      user.save(function (err, user) {
        if (err) {
          initSyncDone(err, null);
        } else if (user) {
          initSyncDone(null, 'max');
        }
      });
    }
  },

};

// exported util functions
util = {
  // checks to see if user needs added to feature and if user feature array is initialized
  // returns date that sync should start from or 'max' if first time syncing
  initSync: function (user, featureName, streamName, initSyncDone) {
    var options = { blankFlag: '0' };
    helper.handleUserFeatureArr(user, featureName, streamName, initSyncDone, options);

    // helper.addUserToFeature(user.local.username, featureName);
  },

  // function to add current data as object to user.datastreams.features array
  addDataToUser: function (user, featureName, streamName, newData, done) {
    var currentStream = user.datastreams[streamName];

    // find proper feature index within users datastream object
    var thisFeatureIndex;
    for (var i = 0; i < currentStream.features.length; i++) {
      if (currentStream.features[i].name == featureName) {
        thisFeatureIndex = i;
      }
    };

    // re-update overlap data
    var thisFeature = currentStream.features[thisFeatureIndex];
    var j = 0;
    for (var i = 0; i < thisFeature.data.length && j < newData.length; i++) {
      if (thisFeature.data[i].dateTime === newData[j].dateTime) {
        thisFeature[i] = newData[j];
        j++;
      }
    }

    // push remaining data
    for (; j < newData.length; j++) {
      thisFeature.data.push(newData[j]);
    };

    // update lastSynTime
    currentStream.lastSyncTime = Date.now();

    user.save(function (err, user) {
      if (err) {
        done(err, null, null);
      } else if (user) {
        done(null, user, null);
      }
    });
  },

};

module.exports = util;
