var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');

var NormalizeButton = React.createClass({
  propTypes: {
    isDisabled: React.PropTypes.bool.isRequired,
  },

  getInitialState: function () {
    return { isNormalized: false };
  },

  handleClick: function () {
    FastFlux.cycle('FILTER_RECEIVED', { key: 'shouldNormalize', value: !this.state.isNormalized });
    this.setState({ isNormalized: !this.state.isNormalized });
  },

  makeButton: function () {
    if (this.props.isDisabled) {
      return (
        <button
          className="ui basic disabled button"
        >
          Normalize
        </button>
      );
    } else if (this.state.isNormalized) {
      return (
        <button
          className="ui active basic button"
          onClick={this.handleClick}
        >
          Normalize
        </button>
      );
    } else {
      return (
        <button
          className="ui basic button"
          onClick={this.handleClick}
        >
          Normalize
        </button>
      );
    }
  },

  render: function () {
    return (
      this.makeButton()
    );
  },

});

module.exports = NormalizeButton;

