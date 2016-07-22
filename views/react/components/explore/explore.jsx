var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var GraphStore = require('../../stores/graphStore');

// Components
var Dropdown = require('./dropdown');
var ExploreGraph = require('./exploreGraph');

var Explore = React.createClass({
  getInitialState: function () {
    if (SessionStore.isSignedIn()) {
      return { user: SessionStore.currentUser() };
    } else {
      return { user: null };
    }
  },

  _onChange: function () {
    this.setState({ user: SessionStore.currentUser() });
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  clickPinZume: function () {
    var currentFeature = GraphStore.getCurrentFeatures();
    var data = { featureName: currentFeature.name };
    debugger;

    FastFlux.webCycle('post', '/auth/zumes/create', {
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
      body: data,
    });

  },

  makeContent: function () {
    var user = this.state.user;
    if (user) {
      return (
        <div>
          <Dropdown user={user} />
          <ExploreGraph user={user} />
          <button className="ui green button" onClick={this.clickPinZume}>Pin Zume</button>
        </div>
      );
    }
  },

  render: function () {
    return (
      <div>
        {this.makeContent()}
      </div>
    );
  },
});

module.exports = Explore;
