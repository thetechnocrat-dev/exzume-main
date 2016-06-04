var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var Constants = require('../constants/constants');

var Store = new Store(Dispatcher);
var _allItems = {};

Store.__onDispatch = function (payload) {

};

module.exports = Store;
