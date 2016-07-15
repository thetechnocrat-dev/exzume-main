var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var SessionStore = new Store(Dispatcher);
var _currentUser = {};

SessionStore.resetSessionStore = function (user) {
  console.log(user.token);

  _currentUser = user;
},

SessionStore.isSignedIn = function () {
  return !(typeof _currentUser.local === 'undefined');
},

SessionStore.currentUser = function () {
  return _currentUser;
},

SessionStore.currentUsername = function () {
  return _currentUser.local.username;
},

SessionStore.getInsights = function (startIndex, size) {
  var insights = _currentUser.insights;
  if (startIndex >= insights.length) {
    return [];
  } else if (startIndex + size >= insights.length) {
    return insights.slice(startIndex);
  } else {
    return insights.slice(startIndex, startIndex + size);
  };
},

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'SESSION_RECEIVED':
      this.resetSessionStore(payload.data);
      this.__emitChange();
      break;
    case 'SESSION_DESTROYED':
      this.resetSessionStore({});
      this.__emitChange();
      break;
  }
};

module.exports = SessionStore;
