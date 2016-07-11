var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var DataConstants = require('../constants/dataConstants');

var DataStore = new Store(Dispatcher);
var _seriesData = [];

DataStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DataConstants.DATA_RECEIVED:
      this.resetSeriesData(payload);
      this.__emitChange();
      break;
  }
};

DataStore.resetSeriesData = function (lineData) {
  _seriesData = lineData.lineData;
},

DataStore.getSeriesData = function () {
  return _seriesData;
},

module.exports = DataStore;
