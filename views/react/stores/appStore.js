var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var AppStore = new Store(Dispatcher);
var _apps = [];

AppStore.resetAppStore = function (apps) {
  _apps = apps;
},

AppStore.getApps = function () {
  return _apps;
},

AppStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'APPS_RECEIVED':
      this.resetAppStore(payload.data);
      this.__emitChange();
      break;
  }
};

module.exports = AppStore;
