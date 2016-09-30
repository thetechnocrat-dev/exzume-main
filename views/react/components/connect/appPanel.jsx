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
    return {
      apps: AppStore.getApps(),
    };
  },

  _onChange: function () {
    this.setState({
      apps: AppStore.getApps(),
    });
  },

  componentDidMount: function () {
    this.appToken = AppStore.addListener(this._onChange);
    FastFlux.webCycle('get', '/apps', {
      shouldStoreReceive: true,
      storeActionType: 'APPS_RECEIVED',
    });
  },

  componentWillUnmount: function () {
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
        <div className='sixteen wide mobile eight wide tablet four wide computer column' key={idx}>
          <AppItem
            app={app}
            isConnected={userConnectedApps.includes(app.name.toLowerCase())}
          />
        </div>
      );
    });
  },

  render: function () {
    return (
      <div className="ui grid container">
        {this.makeAppItems()}
      </div>
    );
  },

});

module.exports = AppPanel;
