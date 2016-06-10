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

  signUp: function (params, errorCallback) {
    console.log(params);
    ApiUtil.signUp(params, this.receiveUser, errorCallback);
  },

  signOut: function () {
    ApiUtil.signOut();
  },

};
