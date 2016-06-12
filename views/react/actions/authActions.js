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
    ApiUtil.signup(params, this.receiveSession, successCallback, errorCallback);
  },

  signIn: function (params, successCallback, errorCallback) {
    ApiUtil.signIn(params, this.receiveSession, successCallback, errorCallback);
  },

  destroySession: function () {
    Dispatcher.dispatch({
      actionType: AuthConstants.SESSION_DESTROYED,
    });
  },

  signOut: function (successCallback) {
    ApiUtil.signout(this.destroySession, successCallback);
  },

  update: function (params, successCallback, errorCallback) {
    ApiUtil.userUpdate(params, successCallback, errorCallback);
  },
};
