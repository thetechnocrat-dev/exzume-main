var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var ExploreStore = new Store(Dispatcher);

// Initial State
var _currentGraphDisplay = 'timeSeries';
var _feature = {};

// Initial State timeSeriesDisplay
var _timeSeriesFilters = {
  dateBound: 'Max',
  shouldNormalize: false,
};
var _timeSeriesData = [];

ExploreStore.reset = function () {
  _currentGraphDisplay = 'timeSeries';
  _feature = {};
  _timeSeriesFilters = {
    dateBound: 'Max',
    shouldNormalize: false,
  };
  _timeSeriesData = [];
};

// Base Explore Store Methods
ExploreStore.setCurrentGraphDisplay = function (graphDisplay) {
  _currentGraphDisplay = graphDisplay;
};

ExploreStore.getCurrentGraphDisplay = function () {
  return _currentGraphDisplay;
};

ExploreStore.setFeature = function (feature) {
  _feature = feature;
};

ExploreStore.getFeature = function () {
  return _feature;
};

ExploreStore.isActive = function () {
  return _feature.name();
};

// Time Series Display Specific
featureToTimeSeries = function (feature) {
  var timeSeries = {};
  timeSeries.name = feature.name;
  timeSeries.data = [];
  for (var i = 0; i < feature.data.length; i++) {
    var dataPoint = {
      x: new Date(feature.data[i].dateTime).getTime(),
      y: feature.data[i].value,
    };
    timeSeries.data.push(dataPoint);
  }

  return timeSeries;
};

ExploreStore.getTimeSeriesData = function () {
  return _timeSeriesData;
};

ExploreStore.addTimeSeriesData = function (feature) {
  _timeSeriesData.push(featureToTimeSeries(feature));
};

ExploreStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'GRAPH_DISPLAY_RECEIVED':
      this.setCurrentGraphDisplay(payload.data);
      this.__emitChange();
      break;
    case 'FEATURE_RECEIVED':
      this.reset();
      this.setFeature(payload.data);
      this.addTimeSeriesData(payload.data);
      this.__emitChange();
      break;
  }
};

module.exports = ExploreStore;

