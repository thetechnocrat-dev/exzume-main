var Dispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/apiUtil');

module.exports = {
  receivedData: function (lineData) {
    Dispatcher.dispatch({
      actionType: 'DATA_RECEIVED',
      lineData: lineData,
    });
  },

  retrievedData: function (params) {
    ApiUtil.fetchData(params, this.receivedData);
  },

  receiveSurveyQuestion: function (surveyQuestion) {
    Dispatcher.dispatch({
      actionType: 'SURVEY_QUESTION_RECEIVED',
      data: surveyQuestion,
    });
  },

  addSurveyQuestion: function (params, success, err) {
    ApiUtil.addSurveyQuestion(params, this.receiveSurveyQuestion, success, err);
  },

  receiveSurveyQuestions: function (surveyQuestions) {
    Dispatcher.dispatch({
      actionType: 'SURVEY_QUESTIONS_RECEIVED',
      data: surveyQuestions,
    });
  },

  retrieveSurveyQuestions: function () {
    ApiUtil.fetchSurveyQuestions(this.receiveSurveyQuestions);
  },

  submitSurveyAnswer: function (params, success, error) {
    ApiUtil.submitSurveyAnswer(params, success, error);
  },

};
