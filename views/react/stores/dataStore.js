var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var Constants = require('../constants/constants');

var DataStore = new Store(Dispatcher);
var _allItems = {};

Store.__onDispatch = function (payload) {

};

DataStore.getData = function () {
  var lineData = [
    {
      name: 'series1',
      values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
      strokeWidth: 3,
      strokeDashArray: "5,5",
    },
    {
      name: 'series2',
      values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
    },
    {
      name: 'series3',
      values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
    }
  ];
  return lineData;
},


module.exports = DataStore;
