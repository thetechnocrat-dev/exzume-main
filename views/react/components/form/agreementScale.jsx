var React = require('react');
var DataActions = require('../../actions/dataActions');

// not working look into react custom link state mixins
var AgreementScale = React.createClass({
  propTypes: {
    key: React.PropTypes.number,
    objectId: React.PropTypes.string,
    prompt: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    // to make answer statue unique for each question
    var answer = 'answer' + this.props.key;
    var initialState = { prompt: this.props.prompt, objectId: this.props.objectId };
    initialState[answer] = '';
    return initialState;
  },

  componentDidMount: function () {
    console.log(this.props.key);
  },

  submitAnswer: function () {
    var params = this.state;
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
            valueLink={_this.linkState('answer' + this.props.key)}
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
