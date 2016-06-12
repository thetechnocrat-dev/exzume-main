var Dispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/authConstants');
var ApiUtil = require('../util/apiUtil');

module.exports = {
  receiveSession: function (userData) {
    Dispatcher.dispatch({
      actionType: AuthConstants.SESSION_RECEIVED,
      user: userData,
    });
  },

  retrieveSession: function () {
    ApiUtil.fetchSession(this.receiveSession);
  },

  signUp: function (params, successCallback, errorCallback) {
    ApiUtil.signUp(params, successCallback, errorCallback);
  },

  signIn: function (params, successCallback, errorCallback) {
    ApiUtil.signIn(params, successCallback, errorCallback);
  },

  destroySession: function () {
    Dispatcher.dispatch({
      actionType: AuthConstants.SESSION_DESTROYED,
    });
  },

  signOut: function (successCallback) {
    ApiUtil.signOut(this.destroySession, successCallback);
  },

  addFormUrl: function (params, successCallback, errorCallback) {
    ApiUtil.addFormUrl(params, successCallback, errorCallback);
  },

  addInsight: function (params, successCallback, errorCallback) {
    ApiUtil.addInsight(params, successCallback, errorCallback);
  },
};
