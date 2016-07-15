var Dispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/sessionConstants');
var ApiUtil = require('../util/apiUtil');

module.exports = {
  addFormUrl: function (params, successCallback, errorCallback) {
    ApiUtil.addFormUrl(params, successCallback, errorCallback);
  },

  addInsight: function (params, successCallback, errorCallback) {
    ApiUtil.addInsight(params, successCallback, errorCallback);
  },

  starInsight: function (params, successCallback, errorCallback) {
    ApiUtil.starInsight(params, successCallback, errorCallback);
  },

  addVisUrl: function (params, successCallback, errorCallback) {
    ApiUtil.addVisUrl(params, successCallback, errorCallback);
  },

  addFitbit: function (successCallback, errorCallback) {
    ApiUtil.addFitbit(successCallback, errorCallback);
  },

  addCorr: function (params, successCallback, errorCallback) {
    ApiUtil.addCorr(params, successCallback, errorCallback);
  },

  addFitbitData: function (params, successCallback, errorCallback) {
    ApiUtil.addFitbitData(params, successCallback, errorCallback);
  },

  addSurveyQuestion: function (params, successCallback, errorCallback) {
    ApiUtil.addSurveyQuestion(params, successCallback, errorCallback);
  },

};
