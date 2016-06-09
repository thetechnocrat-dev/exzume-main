var Dispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/authConstants');
var ApiUtil = require('../util/apiUtil');

module.exports = {
  receiveUser: function (userData) {
    Dispatcher.dispatch({
      actionType: AuthConstants.USER_RECEIVED,
      user: userData,
    });
  },

  signUp: function (params, errorCallback) {
    ApiUtil.signUp(params, this.receiveUser, errorCallback);
  },
};
