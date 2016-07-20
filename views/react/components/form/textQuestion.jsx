var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

// not working look into react custom link state mixins
var TextQuestion = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    prompt: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return (
      { prompt: this.props.prompt, answer: '', }
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
            valueLink={this.linkState('answer')}
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
