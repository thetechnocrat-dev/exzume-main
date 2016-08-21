var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var GraphStore = new Store(Dispatcher);
var _selectedFeatures = [];

GraphStore.resetGraphStore = function () {
  _selectedFeatures = [];
},

GraphStore.addFeature = function (feature) {
  _selectedFeatures.push(feature);
},

GraphStore.removeFeature = function (feature) {
  for (var i = 0; i < _selectedFeatures.length; i++) {
    if (_selectedFeatures[i].name === feature.name) {
      _selectedFeatures.splice(i, 1);
      break;
    }
  }
},

GraphStore.getSeriesData = function () {
  var seriesData = [];
  for (var i = 0; i < _selectedFeatures.length; i++) {
    var feature = _selectedFeatures[i];
    var series = {};
    series.name = feature.name;
    series.values = [];
    for (var j = 0; j < feature.data.length; j++) {
      series.values.push({ x: feature.data[j].dateTime, y: parseInt(feature.data[j].value) });
    }

    seriesData.push(series);
  }

  return seriesData;
},

GraphStore.hasSelectedFeature = function () {
  return _selectedFeatures.length > 0;
},

GraphStore.getSelectedFeatures = function () {
  return _selectedFeatures;
},

GraphStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'FEATURE_RECEIVED':
      this.addFeature(payload.data);
      this.__emitChange();
      break;
    case 'FEATURE_REMOVED':
      this.removeFeature(payload.data);
      this.__emitChange();
      break;
  }
};

module.exports = GraphStore;
