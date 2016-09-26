var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ConnectButton = React.createClass({
  propTypes: {
    appName: React.PropTypes.string.isRequired,
    isConnected: React.PropTypes.bool.isRequired,
    openUrl: React.PropTypes.string.isRequired,
    connectUrl: React.PropTypes.string.isRequired,
  },

  requestUserLocation: function () {

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log('Latitude is ' + latitude + '°');
      console.log('Longitude is ' + longitude + '°');
      window.open(this.props.connectUrl, '_self');
    };

    function error() {
      console.log('Unable to retrieve your location');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  },

  handleClick: function () {
    if (this.props.isConnected) {
      window.open(this.props.openUrl, '_blank');
    } else {
      if (this.props.appName == 'DarkSky') {
        this.requestUserLocation();
      } else {
        window.open(this.props.connectUrl, '_self');
      }
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
