var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var moment = require('moment');

var ExploreStore = new Store(Dispatcher);

// Initial State
var _currentGraphDisplay = 'timeSeries';
var _feature = {};
var _filters = {
  timeSeries: {
    dateBound: 'month',
    shouldNormalize: false,
  },
};

// Initial State for timeSeriesDisplay
var _timeSeriesData = [];
var _moodNoteSeriesData = [];

// Initial State for ScatterCorrelate
var _scatterCorrelateData = [];

// Initial State for BarCorrelate
var _barCorrelateData = [{ correlation: 0, name: 'still calculating' }];
var _barCorrelateIsLoading = true;

// Base Explore Store Methods
ExploreStore.reset = function () {
  _currentGraphDisplay = 'timeSeries';
  _feature = {};
  var _filters = {
    timeSeries: {
      dateBound: 'month',
      shouldNormalize: false,
    },
  };
  _timeSeriesData = [];
  _moodNoteSeriesData = [];
  _scatterCorrelateData = [];
  _barCorrelateData = [{ correlation: 0, name: 'still calculating' }];
  _barCorrelateIsLoading = true;
};

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
  if (_feature.name) {
    return true;
  } else {
    return false;
  }
};

ExploreStore.setFilter = function (filter) {
  _filters[_currentGraphDisplay][filter.key] = filter.value;
};

// Time Series Display Specific -- adjusts based on user timezone if necessary
var featureToTimeSeries = function (feature) {
  var timeSeries = {};

  timeSeries.name = feature.name;
  timeSeries.data = [];

  if (timeSeries.name == 'Mood Rating') {
    console.log('made it');
    for (var i = 0; i < feature.data.length; i++) {
      var dataPoint = {
        x: new Date(feature.data[i].dateTime.valueOf()).getTime(),
        y: feature.data[i].value,
      };
      timeSeries.data.push(dataPoint);
    }
  } else {
    for (var i = 0; i < feature.data.length; i++) {
      var dataPoint = {
        x: new Date(feature.data[i].dateTime).getTime(),
        y: feature.data[i].value,
      };
      timeSeries.data.push(dataPoint);
    }
  }

  return timeSeries;
};

var today = moment(new Date());
var withinBounds =  function (date, dateBound) {
  if (dateBound === 'max') {
    return true;
  } else if (dateBound === 'month') {
    return 31 >= moment.duration(today.diff(moment(date))).asDays();
  } else if (dateBound === 'week') {
    return 7 >= moment.duration(today.diff(moment(date))).asDays();
  }
};

ExploreStore.addMoodNoteSeriesData = function (feature) {
  _moodNoteSeriesData.push(featureToTimeSeries(feature));
  console.log(_moodNoteSeriesData);
},

ExploreStore.removeMoodNoteSeriesData = function () {
  _moodNoteSeriesData = [];
},

ExploreStore.getMoodNoteSeriesData = function () {
  if (_moodNoteSeriesData.length != 0) {
    var timeFilter = _filters.timeSeries.dateBound;
    var filteredMoodNoteSeries = { name: _moodNoteSeriesData[0].name, data: [] };
    for (var j = 0; j < _moodNoteSeriesData[0].data.length; j++) {
      if (withinBounds(_moodNoteSeriesData[0].data[j].x, timeFilter)) {
        // make a copy so that underlying array is not modified
        var dataPoint = {
          x: _moodNoteSeriesData[0].data[j].x,
          y: _moodNoteSeriesData[0].data[j].y,
        };
        filteredMoodNoteSeries.data.push(dataPoint);
      }
    }

    return filteredMoodNoteSeries;
  }

  return null;
},

ExploreStore.getTimeSeriesData = function () {
  var filteredTimeSeries = [];
  var timeFilter = _filters.timeSeries.dateBound;
  for (var i = 0; i < _timeSeriesData.length; i++) {
    var timeSeries = { name: _timeSeriesData[i].name, data: [] };

    for (var j = 0; j < _timeSeriesData[i].data.length; j++) {
      if (withinBounds(_timeSeriesData[i].data[j].x, timeFilter)) {
        // make a copy so that underlying array is not modified
        var dataPoint = { x: _timeSeriesData[i].data[j].x, y: _timeSeriesData[i].data[j].y };
        timeSeries.data.push(dataPoint);
      }
    }

    filteredTimeSeries.push(timeSeries);
  }

  if (_filters.timeSeries.shouldNormalize) {
    for (var i = 0; i < filteredTimeSeries.length; i++) {
      var max = -1;
      for (var j = 0; j < filteredTimeSeries[i].data.length; j++) {
        if (filteredTimeSeries[i].data[j].y > max) { max = filteredTimeSeries[i].data[j].y; }
      }

      for (var k = 0; k < filteredTimeSeries[i].data.length; k++) {
        filteredTimeSeries[i].data[k].y = filteredTimeSeries[i].data[k].y / max;
      }
    }
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

// Correlate Scatter Specific

ExploreStore.featuresToScatter = function (mainFeature, otherFeature) {
  var scatterSeries = {};
  scatterSeries.name = mainFeature.name + ' vs ' + otherFeature.name;
  scatterSeries.data = [];
  scatterSeries.xLabel = mainFeature.name;
  scatterSeries.yLabel = otherFeature.name;
  for (var i = 0; i < mainFeature.data.length; i++) {
    for (var j = 0; j < otherFeature.data.length; j++) {
      if (mainFeature.data[i].dateTime == otherFeature.data[j].dateTime) {
        var dataPoint = {
          x: mainFeature.data[i].value,
          y: otherFeature.data[j].value,
        };
        scatterSeries.data.push(dataPoint);
        break;
      } else if (mainFeature.data[i].dateTime < otherFeature.data[j].dateTime) {
        break;
      }
    }
  }

  return scatterSeries;
};

ExploreStore.setCorrelateScatterData = function (feature) {
  _scatterCorrelateData = [this.featuresToScatter(_feature, feature)];
};

ExploreStore.getCorrelateScatterData = function () {
  return _scatterCorrelateData;
};

// Correlate Bar Specific
ExploreStore.setBarCorrelateData = function (barCorrelateData) {
  _barCorrelateData = barCorrelateData;
};

ExploreStore.getBarCorrelateData = function () {
  return _barCorrelateData;
};

ExploreStore.setBarCorrelateIsLoading = function (bool) {
  _barCorrelateIsLoading = bool;
};

ExploreStore.getBarCorrelateIsLoading = function () {
  return _barCorrelateIsLoading;
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
    case 'MOOD_FEATURE_RECEIVED':
      this.addMoodNoteSeriesData(payload.data);
      this.__emitChange();
      break;
    case 'MOOD_FEATURE_REMOVED':
      this.removeMoodNoteSeriesData(payload.data);
      this.__emitChange();
      break;
    case 'FILTER_RECEIVED':
      this.setFilter(payload.data);
      this.__emitChange();
      break;
    case 'CORRELATE_SCATTER_RECEIVED':
      this.setCurrentGraphDisplay('correlateScatter');
      this.setCorrelateScatterData(payload.data);
      this.__emitChange();
      break;
    case 'CORRELATE_BAR_RECEIVED':
      this.setCurrentGraphDisplay('correlateBar');
      this.setBarCorrelateIsLoading(false);
      this.setBarCorrelateData(payload.data);
      this.__emitChange();
      break;
  }
};

module.exports = ExploreStore;
