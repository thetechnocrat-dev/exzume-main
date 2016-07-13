var React = require('react');
var DataActions = require('../../actions/dataActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var AgreementScale = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    objectId: React.PropTypes.string,
    prompt: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    var answer = 'answer' + this.props.objectId; // to make answer state unique for each question
    var initialState = { prompt: this.props.prompt, objectId: this.props.objectId };
    initialState[answer] = '';
    return initialState;
  },

  submitAnswer: function () {
    var answer = 'answer' + this.props.objectId;
    var params = {
      objectId: this.props.objectId, answer: parseInt(this.state[answer]), date: Date.now(),
    };
    DataActions.submitSurveyAnswer(params, this.error, this.success);
  },

  error: function () {

  },

  success: function () {

  },

  render: function () {
    return (
      <div className="field">
        <label>{this.state.prompt}</label>
          <input
            format="text"
            name={this.state.prompt}
            placeholder="enter a number 1 thru 7"
            valueLink={this.linkState('answer' + this.props.objectId)}
          />
          <div
            className="ui green button"
            onClick={this.submitAnswer}
          >
            Submit
          </div>
      </div>
    );
  },

});

module.exports = AgreementScale;
