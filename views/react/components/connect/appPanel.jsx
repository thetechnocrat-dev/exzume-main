var React = require('react');
var AppStore = require('../../stores/appStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// components
var AppItem = require('./appItem');

var AppPanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
  },

  getInitialState: function () {
    var initialState = {
      viewPortWidth: window.innerWidth,
      viewPortHeight: window.innerHeight,
    };

    initialState.apps = AppStore.getApps();

    return initialState;
  },

  _onChange: function () {
    this.setState({
      apps: AppStore.getApps(),
    });
  },

  handleResize: function () {
    this.setState({ viewPortHeight: window.innerHeight, viewPortWidth: window.innerWidth });
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
    this.appToken = AppStore.addListener(this._onChange);
    FastFlux.webCycle('get', '/apps', {
      shouldStoreReceive: true,
      storeActionType: 'APPS_RECEIVED',
    });
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
    this.appToken.remove();
  },

  getUserConnectedApps: function () {
    var dataStreams = this.props.user.datastreams;
    var userConnectedApps = [];
    for (key in dataStreams) {
      if (dataStreams[key].isConnected) {
        userConnectedApps.push(key);
      }
    }

    return userConnectedApps;
  },

  makeAppItems: function () {
    var userConnectedApps = this.getUserConnectedApps();
    var _this = this;
    return this.state.apps.map(function (app, idx) {
      return (
        <div className="column" key={idx}>
          <AppItem
            app={app}
            isConnected={userConnectedApps.includes(app.name.toLowerCase())}
          />
        </div>
      );
    });
  },

  render: function () {
    // cutoffs are used to match semantic UI's container size
    var LARGE_MONITOR = 1200;
    var SMALL_MONITOR = 992;
    var TABLET = 530; // semantic defines as 768

    if (this.state.viewPortWidth > LARGE_MONITOR) {
      rowClassName = 'four column row';
    } else if (this.state.viewPortWidth > SMALL_MONITOR) {
      rowClassName = 'three column row';
    } else if (this.state.viewPortWidth > TABLET) {
      rowClassName = 'two column row';
    } else {
      rowClassName = 'one column row';
    }

    return (
      <div className="ui container">
        <div className="ui grid">
          <div className={rowClassName}>
            {this.makeAppItems()}
          </div>
        </div>
      </div>
    );
  },

});

module.exports = AppPanel;

