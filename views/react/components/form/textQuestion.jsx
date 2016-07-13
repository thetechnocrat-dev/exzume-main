var React = require('react');

// not working look into react custom link state mixins
var TextQuestion = React.createClass({
  propTypes: {
    objectId: React.PropTypes.string,
    prompt: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return (
      { prompt: this.props.prompt, objectId: this.props.objectId, answer: '', }
    );
  },

  submitAnswer: function () {

  },

  render: function () {
    return (
      <div className="field">
        <label>{this.state.prompt}</label>
          <input
            format="text"
            name={this.state.prompt}
            placeholder=""
            valueLink={_this.linkState('answer')}
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

module.exports = TextQuestion;
