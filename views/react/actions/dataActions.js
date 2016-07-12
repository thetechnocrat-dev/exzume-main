var Dispatcher = require('../dispatcher/dispatcher');
var DataConstants = require('../constants/dataConstants');
var ApiUtil = require('../util/apiUtil');

module.exports = {
  receivedData: function (lineData) {
    Dispatcher.dispatch({
      actionType: DataConstants.DATA_RECEIVED,
      lineData: lineData,
    });
  },

  retrievedData: function () {
    ApiUtil.fetchData(this.receivedData);
  },

  receiveSurveyQuestion: function (surveyQuestion) {
    Dispatcher.dispatch({
      actionType: DataConstants.SURVEY_QUESTION_RECEIVED,
      data: surveyQuestion,
    });
  },

  addSurveyQuestion: function (params, success, err) {
    ApiUtil.addSurveyQuestion(params, this.receiveSurveyQuestion, success, err);
  },

  receiveSurveyQuestions: function (surveyQuestions) {
    Dispatcher.dispatch({
      actionType: DataConstants.SURVEY_QUESTIONS_RECEIVED,
      data: surveyQuestions,
    });
  },

  retrieveSurveyQuestions: function () {
    ApiUtil.fetchSurveyQuestions(this.receiveSurveyQuestions);
  },

};
