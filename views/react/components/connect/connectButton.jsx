var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ConnectButton = React.createClass({
  propTypes: {
    appName: React.PropTypes.string.isRequired,
    isConnected: React.PropTypes.bool.isRequired,
    openUrl: React.PropTypes.string.isRequired,
    connectUrl: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return ({ loading: false, errorMsg: '', successMsg: '' });
  },

  requestUserLocation: function (connectUrl) {
    var _this = this;

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      this.setState({ loading: false, errorMsg: 'Geolocation is not supported by your browser.' });
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
          success: _this.successCallback,
          error: _this.errorCallback,
          shouldStoreReceive: true,
          storeActionType: 'SESSION_RECEIVED',
        });
      };
    };

    function error() {
      console.log('Unable to retrieve your location');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  },

  successCallback: function () {
    this.setState({ loading: false, successMsg: 'Your location has been saved.' });
  },

  errorCallback: function (err) {
    this.setState({ loading: false, errorMsg: 'Unable to retrieve your location.' });
  },

  handleClick: function () {
    if (this.props.isConnected) {
      window.open(this.props.openUrl, '_blank');
    } else {
      if (this.props.appName == 'DarkSky') {
        // will remain in loading state until AJAX callback changes state
        this.setState({ loading: true });
        this.requestUserLocation(this.props.connectUrl);
      } else {
        window.open(this.props.connectUrl, '_self');
      }
    }
  },

  handleCloseClick: function () {
    this.setState({ errorMsg: '', successMsg: '' });
  },

  makeButton: function () {
    if (this.state.loading) {
      return (
        <button
          className="ui green disabled loading labeled mini icon button"
        >
          <i className="plus icon" />
          {this.props.isConnected ? 'open' : 'connect'}
        </button>
      );
    } else {
      return (
        <button
          className="ui green labeled mini icon button"
          onClick={this.handleClick}
        >
          <i className="plus icon" />
          {this.props.isConnected ? 'open' : 'connect'}
        </button>
      );
    }
  },

  makeMessage: function () {
    if (this.state.errorMsg.length > 0) {
      return (
        <div className="ui small error message">
          <i
            className="close icon"
            onClick={this.handleCloseClick}
          />
          <div className="header">
            {this.state.errorMsg}
          </div>
        </div>
      );
    } else if (this.state.successMsg.length > 0) {
      return (
        <div className="ui small success message">
          <i
            className="close icon"
            onClick={this.handleCloseClick}
          />
          <div className="header">
            {this.state.successMsg}
          </div>
        </div>
      );
    }
  },

  render: function () {
    return (
      <div>
        {this.makeButton()}
        {this.makeMessage()}
      </div>
    );
  },

});

module.exports = ConnectButton;
