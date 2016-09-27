var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var moment = require('moment');

var ExploreStore = new Store(Dispatcher);

// Initial State
var _currentGraphDisplay = 'timeSeries';
var _feature = {};
var _filters = {
  timeSeries: {
    dateBound: 'week',
    shouldNormalize: false,
  },
};

// Initial State timeSeriesDisplay
var _timeSeriesData = [];

ExploreStore.reset = function () {
  _currentGraphDisplay = 'timeSeries';
  _feature = {};
  var _filters = {
    timeSeries: {
      dateBound: 'week',
      shouldNormalize: false,
    },
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

ExploreStore.setFilter = function (filter) {
  _filters[_currentGraphDisplay][filter.key] = filter.value;
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
  var today = moment(new Date());
  var withinBounds =  function (date, dateBound) {
    console.log(date);
    console.log(dateBound);
    if (dateBound === 'max') {
      return true;
    } else if (dateBound === 'month') {
      return 31 >= moment.duration(today.diff(moment(date))).asDays();
    } else if (dateBound === 'week') {
      return 7 >= moment.duration(today.diff(moment(date))).asDays();
    }
  };

  var filteredTimeSeries = [];
  var timeFilter = _filters[_currentGraphDisplay].dateBound;
  for (var i = 0; i < _timeSeriesData.length; i++) {
    var timeSeries = { name: _timeSeriesData[i].name, data: [] };
    for (var j = 0; j < _timeSeriesData[i].data.length; j++) {
      if (withinBounds(_timeSeriesData[i].data[j].x, timeFilter)) {
        timeSeries.data.push(_timeSeriesData[i].data[j]);
      }
    }

    console.log(filteredTimeSeries);
    console.log(_timeSeriesData);

    filteredTimeSeries.push(timeSeries);
  }

  return filteredTimeSeries;
};

ExploreStore.addTimeSeriesData = function (feature) {
  _timeSeriesData.push(featureToTimeSeries(feature));
};

ExploreStore.removeTimeSeriesData = function (feature) {
  for (var i = 0; i < _timeSeriesData.length; i++) {
    if (_timeSeriesData[i].name === feature.name) {
      _timeSeriesData.splice(i, 1);
      break;
    }
  }
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
    case 'TIME_SERIES_RECEIVED':
      this.addTimeSeriesData(payload.data);
      this.__emitChange();
      break;
    case 'TIME_SERIES_REMOVED':
      this.removeTimeSeriesData(payload.data);
      this.__emitChange();
      break;
    case 'FILTER_RECEIVED':
      this.setFilter(payload.data);
      this.__emitChange();
      break;
  }
};

module.exports = ExploreStore;

