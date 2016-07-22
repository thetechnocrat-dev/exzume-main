var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var GraphStore = new Store(Dispatcher);
var _currentFeatures = {};

GraphStore.resetGraphStore = function (currentFeatures) {
  _currentFeatures = currentFeatures;
},

GraphStore.getSeriesData = function () {
  var seriesData = [];
  var dates = _currentFeatures.dates || [];
  var data = _currentFeatures.data || [];
  var name = _currentFeatures.name || '';
  for (var i = 0; i < dates.length; i++) {
    seriesData.push({ x: (new Date(dates[i])).getTime(), y: data[i] });
  }

  return seriesData;
},

GraphStore.hasFeature = function () {
  if (_currentFeatures.name) {
    return true;
  } else {
    return false;
  }
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
