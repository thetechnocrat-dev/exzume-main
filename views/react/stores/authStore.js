var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/authConstants');

var AuthStore = new Store(Dispatcher);
var _currentUser = {};

AuthStore.resetAuthStore = function (user) {
  _currentUser = user;
},

AuthStore.isSignedIn = function () {
  return !(typeof _currentUser.user === 'undefined');
},

AuthStore.currentUser = function () {
  return _currentUser.user;
},

AuthStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AuthConstants.SESSION_RECEIVED:
      this.resetAuthStore(payload.user);
      this.__emitChange();
      break;
    case AuthConstants.SESSION_DESTROYED:
      this.resetAuthStore({});
      this.__emitChange();
      break;
  }
};

module.exports = AuthStore;
