var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionStore = require('../stores/sessionStore');
var DataActions = require('../actions/dataActions');

// components

var Survey = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({ questionPrompt: '', questionType: 'text' });
  },

  setQuestionType: function (type) {
    this.setState({ questionType: type });
  },

  submitAddQuestion: function () {
    var params = {
      owner: SessionStore.currentUsername(),
      prompt: this.state.questionPrompt,
      type: this.state.questionType,
    };

    DataActions.addSurveyQuestion(params, this.success, this.err);
  },

  success: function () {

  },

  err: function () {

  },

  render: function () {
    return (
      <div className="ui container">
        <form className="ui form">

          <div className="required field">
            <label>Question Prompt</label>
            <input
              type="text"
              name="question prompt"
              placeholder=""
              valueLink={this.linkState('questionPrompt')}
              ></input>
          </div>

          <div className="required field">
            <label>Question Type</label>
            <select className="ui fluid dropdown">
              <option value="text" onClick={this.setQuestionType.bind(null, 'text')}>text</option>
              <option
                value="agreement scale"
                onClick={this.setQuestionType.bind(null, 'agreement scale')}
              >
                agreement scale
              </option>
            </select>
          </div>

          <div className="ui green button" onClick={this.submitAddQuestion}>Submit</div>
        </form>
      </div>
    );
  },

});

module.exports = Survey;
