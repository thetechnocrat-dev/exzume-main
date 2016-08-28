var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ConnectButton = React.createClass({
  propTypes: {
    isConnected: React.PropTypes.bool.isRequired,
    openUrl: React.PropTypes.string.isRequired,
    connectUrl: React.PropTypes.string.isRequired,
  },

  handleClick: function () {
    if (this.props.isConnected) {
      window.open(this.props.openUrl, '_blank');
    } else {
      window.open(this.props.connectUrl, '_self');
    }
  },

  makeButton: function () {
    return (
      <button
        className="ui green labeled mini icon button"
        onClick={this.handleClick}
      >
        <i className="plus icon" />
        {this.props.isConnected ? 'open' : 'connect'}
      </button>
    );
  },

  render: function () {
    return (
      <div>
        {this.makeButton()}
      </div>
    );
  },

});

module.exports = ConnectButton;

