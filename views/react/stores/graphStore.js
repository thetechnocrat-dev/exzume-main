var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var GraphStore = new Store(Dispatcher);
var _currentFeatures = {};

GraphStore.resetGraphStore = function (currentFeatures) {
  _currentFeatures = currentFeatures;
},

GraphStore.getSeriesData = function () {
  var seriesData = [];
  var data = _currentFeatures.data || [];
  for (var i = 0; i < this.props.data.length; i++) {
    featureData.push({ x: this.props.data[i].dateTime,
                       y: this.props.data[i].value });
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
