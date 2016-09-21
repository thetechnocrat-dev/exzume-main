var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var moment = require('moment');

var GraphStore = new Store(Dispatcher);
var _selectedFeatures = [];
var _filters = {
  dateBound: 'Week',
  shouldNormalize: false,
};
var _correlation = null;
var _pValue = null;
var _graphType = 'line';
var _barData = [];
var _groupedBarData = [];

GraphStore.resetGraphStore = function () {
  _selectedFeatures = [];
  _filters = {
    dateBound: 'Week',
    shouldNormalize: false,
  };
  _correlation = null;
  _pValue = null;
  _graphType = 'line';
  _barData = [];
  _groupedBarData = [];
},

GraphStore.addFeature = function (feature) {
  // resets correlation when a feature is recieved because currently only two featurecan correlate
  _correlation = null;
  _pValue = null;
  _selectedFeatures.push(feature);
},

GraphStore.removeFeature = function (feature) {
  _correlation = null;
  _pValue = null;
  for (var i = 0; i < _selectedFeatures.length; i++) {
    if (_selectedFeatures[i].name === feature.name) {
      _selectedFeatures.splice(i, 1);
      break;
    }
  }
},

GraphStore.addFilter = function (filter) {
  _filters[filter.key] = filter.value;
},

GraphStore.getDateBound = function () {
  return _filters.dateBound;
},

GraphStore.getCorrelation = function () {
  return _correlation;
},

GraphStore.setCorrelation = function (correlation) {
  _correlation = correlation;
},

GraphStore.getPValue = function () {
  return _pValue;
},

GraphStore.setPValue = function (pValue) {
  _pValue = pValue;
},

GraphStore.setGraphType = function (graphType) {
  _graphType = graphType;
},

GraphStore.getGraphType = function () {
  return _graphType;
},

GraphStore.setBarData = function (barData) {
  console.log('setBar Data');
  console.log(barData);
  _barData = [barData];
},

GraphStore.setGroupedBarData = function (groupedBarData) {
  console.log('set grouped bar data');
  _groupedBarData = groupedBarData;
},

GraphStore.getGroupedBarData = function (groupedBarData) {
  console.log(groupedBarData);
  return _groupedBarData;
},

GraphStore.getBarData = function () {
  console.log(_barData);
  return _barData;
},

GraphStore.getSeriesData = function () {
  var today = moment(new Date());
  var withinBounds =  function (date, dateBound) {
    if (dateBound === 'Max') {
      return true;
    } else if (dateBound === 'Month') {
      return 31 >= moment.duration(today.diff(moment(date))).asDays();
    } else if (dateBound === 'Week') {
      return 7 >= moment.duration(today.diff(moment(date))).asDays();
    }
  };

  var seriesData = [];
  if (!_filters.shouldNormalize) {
    for (var i = 0; i < _selectedFeatures.length; i++) {
      var feature = _selectedFeatures[i];
      var series = {};
      series.name = feature.name;
      series.values = [];
      for (var j = 0; j < feature.data.length; j++) {
        if (withinBounds(feature.data[j].dateTime, _filters.dateBound)) {
          series.values.push({ x: feature.data[j].dateTime, y: parseFloat(feature.data[j].value) });
        }
      }

      seriesData.push(series);
    }
  } else {
    for (var i = 0; i < _selectedFeatures.length; i++) {
      var feature = _selectedFeatures[i];
      var series = {};
      series.name = feature.name;
      series.values = [];
      var sum = 0;

      for (var j = 0; j < feature.data.length; j++) {
        if (withinBounds(feature.data[j].dateTime, _filters.dateBound)) {
          sum += parseInt(feature.data[j].value);
          series.values.push({ x: feature.data[j].dateTime, y: parseInt(feature.data[j].value) });
        }
      }

      var avg = sum / series.values.length;
      var normalizedSeries = series.values.map(function (obj) {
        obj.y /= avg;
        return obj;
      });

      seriesData.push({ name: series.name, values: normalizedSeries });
    }
  }

  return seriesData;
},

// For calculations
GraphStore.getRawSeriesData = function () {
  var today = moment(new Date());
  var withinBounds =  function (date, dateBound) {
    if (dateBound === 'Max') {
      return true;
    } else if (dateBound === 'Month') {
      return 31 >= moment.duration(today.diff(moment(date))).asDays();
    } else if (dateBound === 'Week') {
      return 7 >= moment.duration(today.diff(moment(date))).asDays();
    }
  };

  var seriesData = [];
  for (var i = 0; i < _selectedFeatures.length; i++) {
    var feature = _selectedFeatures[i];
    var series = {};
    series.name = feature.name;
    series.values = [];

    for (var j = 0; j < feature.data.length; j++) {
      if (withinBounds(feature.data[j].dateTime, _filters.dateBound)) {
        series.values.push({ x: feature.data[j].dateTime, y: parseInt(feature.data[j].value) });
      }
    }

    seriesData.push({ name: series.name, values: series.values });
  }

  return seriesData;
},

GraphStore.hasSelectedFeature = function () {
  return _selectedFeatures.length > 0;
},

GraphStore.getSelectedFeatures = function () {
  return _selectedFeatures;
},

GraphStore.hasTwoSelectedFeatures = function () {
  return _selectedFeatures.length == 2;
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
    case 'FILTER_RECEIVED':
      this.addFilter(payload.data);
      this.__emitChange();
      break;
    case 'CORRELATION_RECEIVED':
      this.setCorrelation(payload.data);
      this.__emitChange();
      break;
    case 'PVALUE_RECEIVED':
      this.setPValue(payload.data);
      this.__emitChange();
      break;
    case 'GRAPH_TYPE_RECEIVED':
      this.setGraphType(payload.data);
      this.__emitChange();
      break;
    case 'BAR_DATA_RECEIVED':
      console.log('BAR_DATA_RECEIVED');
      console.log(payload.data);
      this.setBarData(payload.data);
      this.setGraphType('bar');
      this.__emitChange();
      break;
    case 'GROUPED_BAR_DATA_RECEIVED':
      console.log('GROUPED_BAR_DATA_RECEIVED');
      console.log(payload.data);
      this.setGroupedBarData(payload.data);
      this.setGraphType('groupedBar');
      this.__emitChange();
      break;
  }
};

module.exports = GraphStore;
