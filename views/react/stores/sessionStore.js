var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var streamNames = require('../util/streamNames');

var SessionStore = new Store(Dispatcher);
var _currentUser = {};

SessionStore.resetSessionStore = function (user) {
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

SessionStore.getTimezoneOffset = function () {
  return _currentUser.timezoneOffset;
},

SessionStore.getUserFeatures = function () {
  var dataStreams = _currentUser.datastreams;
  var userActiveFeatures = [];

  for (dataStream in dataStreams) {
    for (var i = 0; i < dataStreams[dataStream].features.length; i++) {
      if (dataStreams[dataStream].features[i].name != 'Mood Note') {
        userActiveFeatures.push(dataStreams[dataStream].features[i]);
      }
    }
  }

  return userActiveFeatures;
},

SessionStore.getUserStreams = function () {
  var userActiveStreams = [];

  for (key in _currentUser.datastreams) {
    if (_currentUser.datastreams[key].isConnected) {
      var stream = _currentUser.datastreams[key];
      userActiveStreams.push(stream);
    }
  }

  return userActiveStreams;
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
