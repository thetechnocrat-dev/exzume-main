var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionStore = require('../stores/sessionStore');
var DataStore = require('../stores/dataStore');
var DataActions = require('../actions/dataActions');

// components
var TextQuestion = require('./form/textQuestion');
var AgreementScale = require('./form/agreementScale');

var Survey = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return (
      {
        questionPrompt: '', questionFormat: 'text', shouldShowContent: false,
        surveyQuestions: DataStore.getSurveyQuestions(),
      }
    );
  },

  _onChange: function () {
    this.setState({ surveyQuestions: DataStore.getSurveyQuestions() });
  },

  componentDidMount: function () {
    this.dataToken = DataStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.dataToken.remove();
  },

  setQuestionType: function (format) {
    this.setState({ questionFormat: format });
  },

  submitAddQuestion: function () {
    var params = {
      owner: SessionStore.currentUsername(),
      prompt: this.state.questionPrompt,
      format: this.state.questionFormat,
    };

    DataActions.addSurveyQuestion(params, this.success, this.err);
  },

  success: function () {

  },

  err: function () {

  },

  submitAnswer: function () {

  },

  clickAngleIcon: function () {
    DataActions.retrieveSurveyQuestions();
    this.setState({ shouldShowContent: !this.state.shouldShowContent });
  },

  makeInsights: function () {
    return this.state.insights.map(function (insight, idx) {
      return (
        <InsightItem
          key={idx}
          time={insight.date}
          message={insight.message}
          id={insight._id}
          isLiked={insight.liked}
          username = {SessionStore.currentUser().local.username}
        />
      );
    });
  },

  makeSurveyQuestions: function () {
    _this = this;
    return DataStore.getSurveyQuestions().map(function (question, idx) {
      if (question.format === 'agreement scale') {
        return (
          <AgreementScale key={idx} prompt={question.prompt} objectId={question.id} />
        );
      } else if (question.format === 'text') {
        return (
          <TextQuestion key={idx} prompt={question.prompt} objectId={question.id} />
        );
      }
    });
  },

  makeDropdownMenu: function () {
    if (this.state.questionFormat === 'text') {
      return (
        <div className="menu">
          <div className="active item">text</div>
          <div
            className="item"
            onClick={this.setQuestionType.bind(null, 'agreement scale')}
          >
            agreement scale
          </div>
        </div>
      );
    } else if (this.state.questionFormat === 'agreement scale') {
      return (
        <div className="menu">
          <div
            className="item"
            onClick={this.setQuestionType.bind(null, 'text')}
          >
            text
          </div>
          <div className="active item">agreement scale</div>
        </div>
      );
    }
  },

  makeContent: function () {
    var angleIconStyle = { cursor: 'pointer' };
    var submitButtonStyle = { marginTop: '2.5%' };
    if (this.state.shouldShowContent) {
      return (
        <div className="ui container">
          <form className="ui form">
            {this.makeSurveyQuestions()}
          </form>
          <h3 className="left aligned header">Add Question</h3>
          <form className="ui form">

            <div className="required field">
              <label>Question Prompt</label>
              <input
                format="text"
                name="question prompt"
                placeholder=""
                valueLink={this.linkState('questionPrompt')}
                ></input>
            </div>

            <div className="required field">
              <label>Question Type</label>
              <div className="ui fluid selection simple dropdown">
                {this.state.questionFormat}
                <i className="dropdown icon" />
                {this.makeDropdownMenu()}
              </div>
            </div>

            <div
              className="ui green button"
              style={submitButtonStyle}
              onClick={this.submitAddQuestion}
            >
              Submit
            </div>
          </form>
          <div className="ui centered grid">
            <div className="centered row">
              <i
                className="large grey angle up icon"
                style={angleIconStyle}
                onClick={this.clickAngleIcon}
                />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui centered grid">
          <div className="centered row">
            <i
              className="large grey angle down icon"
              style={angleIconStyle}
              onClick={this.clickAngleIcon}
              />
          </div>
        </div>
      );
    }

  },

  render: function () {
    return (
      <div>{this.makeContent()}</div>
    );
  },

});

module.exports = Survey;
