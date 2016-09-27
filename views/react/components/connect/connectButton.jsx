var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ConnectButton = React.createClass({
  propTypes: {
    appName: React.PropTypes.string.isRequired,
    isConnected: React.PropTypes.bool.isRequired,
    openUrl: React.PropTypes.string.isRequired,
    connectUrl: React.PropTypes.string.isRequired,
  },

  requestUserLocation: function (connectUrl) {

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }

    function success(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var userLoc = { latitude: lat, longitude: long };

      console.log('Latitude is ' + lat + '°');
      console.log('Longitude is ' + long + '°');

      // POST to user document in DB
      if (lat & long) {
        FastFlux.webCycle('post', connectUrl, {
          body: userLoc,
        });
      };
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
        this.requestUserLocation(this.props.connectUrl);
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
