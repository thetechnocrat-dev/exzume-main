Feature = require('../../models/feature');

// exported util functions
util = {
  // function to add current data as object to user.datastreams.features array
  addDataToUser: function (user, featureName, streamName, newData, endSync) {
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

    // update lastSyncTime
    currentStream.lastSyncTime = Date.now();

    user.save(function (err, user) {
      if (err) {
        endSync(err, null, null);
      } else if (user) {
        endSync(null, user, null);
      }
    });
  },

};

module.exports = util;
