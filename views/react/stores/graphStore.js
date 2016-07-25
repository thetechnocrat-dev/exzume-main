var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var GraphStore = new Store(Dispatcher);
var _currentFeature = {};

GraphStore.resetGraphStore = function (currentFeature) {
  _currentFeature = currentFeature;
},

GraphStore.getSeriesData = function () {
  var seriesData = [];
  var data = _currentFeature.data || [];
  for (var i = 0; i < data.length; i++) {
    seriesData.push({ x: data[i].dateTime, y: parseInt(data[i].value) });
  }

  return seriesData;
},

GraphStore.hasCurrentFeature = function () {
  if (_currentFeature.name) {
    return true;
  } else {
    return false;
  }
},

GraphStore.getCurrentFeature = function () {
  return _currentFeature;
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
