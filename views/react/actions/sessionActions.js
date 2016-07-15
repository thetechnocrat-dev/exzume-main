var Dispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/apiUtil');

module.exports = {
  starInsight: function (params, successCallback, errorCallback) {
    ApiUtil.starInsight(params, successCallback, errorCallback);
  },

  addFitbit: function (successCallback, errorCallback) {
    ApiUtil.addFitbit(successCallback, errorCallback);
  },

  addSurveyQuestion: function (params, successCallback, errorCallback) {
    ApiUtil.addSurveyQuestion(params, successCallback, errorCallback);
  },

};
