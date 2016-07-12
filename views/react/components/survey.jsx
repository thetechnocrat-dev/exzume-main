var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionStore = require('../stores/sessionStore');
var DataActions = require('../actions/dataActions');

// components

var Survey = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({ questionPrompt: '', questionFormat: 'text' });
  },

  setQuestionType: function (format) {
    console.log('here');
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

  render: function () {
    return (
      <div className="ui container">
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
            <div className="ui simple dropdown item">
              {this.state.questionFormat}
              <i className
            </div>
          </div>

          <div className="ui green button" onClick={this.submitAddQuestion}>Submit</div>
        </form>
      </div>
    );
  },

});

module.exports = Survey;
