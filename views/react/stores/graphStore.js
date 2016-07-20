var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var GraphStore = new Store(Dispatcher);
var _currentFeatures = {};

GraphStore.resetGraphStore = function (currentFeatures) {
  _currentFeatures = currentFeatures;
},

GraphStore.getCurrentFeatures = function () {
  return _currentFeatures;
},

GraphStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'FEATURE_RECEIVED':
      this.resetGraphStore(payload.data);
      this.__emitChange();
      break;
  }
};

module.exports = GraphStore;
