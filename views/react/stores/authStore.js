var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/authConstants');

var AuthStore = new Store(Dispatcher);
var _currentUser = { user: '' };

AuthStore.resetAuthStore = function (user) {
  _currentUser = user;
},

AuthStore.isSignedIn = function () {
  return !(typeof _currentUser.user.local === 'undefined');
},

AuthStore.currentUser = function () {
  return _currentUser.user;
},

AuthStore.getInsights = function (startIndex, size) {
  var insights = _currentUser.user.insights;
  if (startIndex >= insights.length) {
    return [];
  } else if (startIndex + size >= insights.length) {
    return insights.slice(startIndex);
  } else {
    return insights.slice(startIndex, startIndex + size);
  };
},

AuthStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AuthConstants.SESSION_RECEIVED:
      this.resetAuthStore(payload.user);
      this.__emitChange();
      break;
    case AuthConstants.SESSION_DESTROYED:
      this.resetAuthStore({ user: '' });
      this.__emitChange();
      break;
  }
};

module.exports = AuthStore;
