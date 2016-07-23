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

  _onChangeSession: function () {
    this.setState({ user: SessionStore.currentUser() });
  },

  _onChangeGraph: function () {
    this.setState({ seriesData: GraphStore.getSeriesData() });
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChangeSession);
    this.graphToken = GraphStore.addListener(this._onChangeGraph);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
    GraphStore.resetGraphStore([]);
    this.graphToken.remove();
  },

  clickPinZume: function () {
    var currentFeature = GraphStore.getCurrentFeatures();
    var data = { featureName: currentFeature.name };

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
          <ExploreGraph
            user={user}
            seriesData={GraphStore.getSeriesData()}
            currentFeature={GraphStore.getCurrentFeature()}
          />
          <div className="ui grid">
            <div className="four column row">
              <div className="right floated column">
                <button className="ui green button" data-tooltip="Pin this zume to your dashboard!" onClick={this.clickPinZume}>Pin Zume</button>
              </div>
            </div>
          </div>
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
