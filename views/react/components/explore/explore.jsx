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
      return { user: SessionStore.currentUser(), successMessage: false };
    } else {
      return { user: null, successMessage: false };
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
    GraphStore.resetGraphStore({});
    this.graphToken.remove();
  },

  makePinZumeButton: function () {
    if (GraphStore.hasCurrentFeature()) {
      return (<button className="ui green button" data-tooltip="Pin this zume to your dashboard!" onClick={this.clickPinZume}>Pin Zume</button>);
    } else {
      return (<button className="ui disabled button" data-tooltip="Select a feature first!">Pin Zume</button>);
    }
  },

  clickPinZume: function () {
    var currentFeature = GraphStore.getCurrentFeature();
    var data = { featureName: currentFeature.name };

    FastFlux.webCycle('post', '/auth/zumes/create', {
      success: this.successCallback,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
      body: data,
    });

  },

  successCallback: function () {
    console.log(this.state.successMessage);
    this.state.successMessage = true;
    console.log(this.state.successMessage);
  },


  makeSuccessMessage: function () {
    if (this.state.successMessage) {
      return (
        <div className="ui success message">
          <i className="close icon"></i>
          <div className="header">
            Zume successfully pinned.
          </div>
          <p>Check it out on your Dashboard!</p>
        </div>
      );
    }
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
                {this.makePinZumeButton()}
                {this.makeSuccessMessage()}
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
