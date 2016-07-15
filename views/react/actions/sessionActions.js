var Dispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/sessionConstants');
var ApiUtil = require('../util/apiUtil');

module.exports = {
  starInsight: function (params, successCallback, errorCallback) {
    ApiUtil.starInsight(params, successCallback, errorCallback);
  },

  addVisUrl: function (params, successCallback, errorCallback) {
    ApiUtil.addVisUrl(params, successCallback, errorCallback);
  },

  addFitbit: function (successCallback, errorCallback) {
    ApiUtil.addFitbit(successCallback, errorCallback);
  },

  addFitbitData: function (params, successCallback, errorCallback) {
    ApiUtil.addFitbitData(params, successCallback, errorCallback);
  },

  addSurveyQuestion: function (params, successCallback, errorCallback) {
    ApiUtil.addSurveyQuestion(params, successCallback, errorCallback);
  },

};
