var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var FeatureStore = new Store(Dispatcher);
var _features = [];

FeatureStore.resetFeatureStore = function (features) {
  _features = features;
},

FeatureStore.features = function () {
  return _features;
},

FeatureStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'FEATURES_RECEIVED':
      this.resetFeatureStore(payload.data);
      this.__emitChange();
      break;
  }
};

module.exports = FeatureStore;
