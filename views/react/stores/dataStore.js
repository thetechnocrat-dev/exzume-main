var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var DataConstants = require('../constants/dataConstants');

var DataStore = new Store(Dispatcher);
var _seriesData = [];
var _surveyQuestions = [];

DataStore.resetSeriesData = function (lineData) {
  _seriesData = [lineData];
},

DataStore.getSeriesData = function () {
  return _seriesData;
},

DataStore.resetSurveyQuestions = function (surveyQuestions) {
  _surveyQuestions = surveyQuestions;
},

DataStore.getSurveyQuestions = function () {
  return _surveyQuestions;
},

DataStore.addSurveyQuestion = function (surveyQuestion) {
  _surveyQuestions.push(surveyQuestion);
},

DataStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DataConstants.DATA_RECEIVED:
      this.resetSeriesData(payload.lineData.data);
      this.__emitChange();
      break;
    case DataConstants.SURVEY_QUESTIONS_RECEIVED:
      this.resetSurveyQuestions(payload.data.surveyQuestions);
      this.__emitChange();
      break;
    case DataConstants.SURVEY_QUESTION_RECEIVED:
      this.addSurveyQuestion(payload.data.feature);
      this.__emitChange();
      break;
  }
};

module.exports = DataStore;
