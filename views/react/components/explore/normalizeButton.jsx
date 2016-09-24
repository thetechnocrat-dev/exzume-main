var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var PropTypes = React.PropTypes;

var NormalizeButton = React.createClass({
  getInitialState: function () {
    return { isNormalized: false };
  },

  handleClick: function () {
    FastFlux.cycle('FILTER_RECEIVED', { key: 'shouldNormalize', value: !this.state.isNormalized });
    this.setState({ isNormalized: !this.state.isNormalized });
  },

  makeButton: function () {
    var buttonStyle = { marginTop: '10px' };

    if (this.state.isNormalized) {
      return (
        <button
          className="ui yellow button"
          onClick={this.handleClick}
          style={buttonStyle}
        >
          Denormalize
        </button>
      );
    } else {
      return (
        <button
          className="ui yellow button"
          onClick={this.handleClick}
          style={buttonStyle}
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

