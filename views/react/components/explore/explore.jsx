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
    var initState = ({
      viewPortWidth: window.innerWidth,
      viewPortHeight: window.innerHeight,
      successMessage: false,
    });

    if (SessionStore.isSignedIn()) {
      initState.user = SessionStore.currentUser();
    } else {
      initState.user = null;
    }

    return initState;
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
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
    GraphStore.resetGraphStore({});
    this.graphToken.remove();
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function () {
    var viewPortHeight = window.innerHeight;
    var viewPortWidth = window.innerWidth;
    this.setState({ viewPortHeight: viewPortHeight, viewPortWidth: viewPortWidth });
  },

  makePinZumeButton: function () {
    if (GraphStore.hasCurrentFeature()) {
      return (
        <button
          className="ui green button"
          data-tooltip="Pin this zume to your dashboard!"
          onClick={this.clickPinZume}>Pin Zume
        </button>
      );
    } else {
      return (
        <button className="ui disabled button">
          Pin Zume
        </button>
      );
    }
  },

  clickPinZume: function () {
    var currentFeature = GraphStore.getCurrentFeature();
    var data = { featureName: currentFeature.name };

    FastFlux.webCycle('post', '/auth/zumes/create', {
      success: this.success,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
      body: data,
    });

  },

  success: function () {
    this.state.successMessage = true;
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

  calcGraphWidth: function () {
    // cutoffs are used to match semantic UI's container size
    var LARGE_MONITOR = 1200;
    var SMALL_MONITOR = 992;
    var TABLET = 768;

    if (this.state.viewPortWidth > LARGE_MONITOR) {
      return 1127;
    } else if (this.state.viewPortWidth > SMALL_MONITOR) {
      return 933;
    } else if (this.state.viewPortWidth > TABLET) {
      return 723;
    } else {
      return this.state.viewPortWidth;
    }
  },

  makeContent: function () {
    var user = this.state.user;
    var graphHeight = this.state.viewPortHeight * 0.75;
    var graphWidth = this.calcGraphWidth();

    if (user) {
      return (
        <div>
          <Dropdown user={user} />
          <ExploreGraph
            user={user}
            seriesData={GraphStore.getSeriesData()}
            currentFeature={GraphStore.getCurrentFeature()}
            width={graphWidth}
            height={graphHeight}
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
