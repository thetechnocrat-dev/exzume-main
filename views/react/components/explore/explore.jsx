var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var GraphStore = require('../../stores/graphStore');

// Components
var ExploreGraph = require('./exploreGraph');
var SelectFeaturePanel = require('./selectFeaturePanel');
var TimeMenu = require('./timeMenu');
var SelectedFeatureMenu = require('./selectedFeatureMenu');
var NormalizeButton = require('./normalizeButton');
var CorrelateButton = require('./correlateButton');

var Explore = React.createClass({
  getInitialState: function () {
    var initState = ({
      viewPortWidth: window.innerWidth,
      viewPortHeight: window.innerHeight,
      successMessage: false,
      corrMessage: null,
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
    if (GraphStore.hasSelectedFeature()) {
      return (
        <button
          className="ui green button"
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
    var selectedFeatures = GraphStore.getSelectedFeatures().map(function (feature) {
      return feature.name;
    });

    var data = { featureNames: selectedFeatures };

    FastFlux.webCycle('post', '/auth/zumes/create', {
      success: this.success,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
      body: data,
    });

  },

  success: function () {
    this.setState({ successMessage: true });
  },

  closeMessage: function () {
    this.setState({ successMessage: false });
  },

  makeSuccessMessage: function () {
    if (this.state.successMessage) {
      return (
        <div className="ui success message">
          <i className="close icon" onClick={this.closeMessage} />
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

  getSelectableFeatures: function () {
    var userFeatures = SessionStore.getUserFeatures();
    var selectedFeatures = GraphStore.getSelectedFeatures();

    return userFeatures.filter(function (feature) {
      for (var i = 0; i < selectedFeatures.length; i++) {
        if (selectedFeatures[i].name === feature.name) {
          return false;
        }
      }

      return true;
    });
  },

  makeContent: function () {
    var user = this.state.user;
    var graphHeight = this.state.viewPortHeight * 0.7;
    var graphWidth = this.calcGraphWidth();

    if (user) {
      return (
        <div>
          <div className="ui grid">
            <div className="four column row" style={{ marginBottom: '0', paddingBottom: '0' }}>
              <div className="column">
                <SelectFeaturePanel
                  selectableFeatures={this.getSelectableFeatures()}
                  selectedFeatures={GraphStore.getSelectedFeatures()}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: '0', paddingTop: '0', paddingBottom: '9px' }}>
              <div className="column">
                <SelectedFeatureMenu features={GraphStore.getSelectedFeatures()} />
              </div>
            </div>
            <div className="row" style={{ paddingTop: '0', paddingBottom: '0' }}>
              <div className="column">
                <NormalizeButton features={GraphStore.getSelectedFeatures()} />
                <CorrelateButton correlation={GraphStore.getCorrelation()} />
              </div>
            </div>
          </div>
          <ExploreGraph
            seriesData={GraphStore.getSeriesData()}
            width={graphWidth}
            height={graphHeight}
          />
          <div className="ui grid">
            <div className="four column row">
              <div className="column">
                <TimeMenu isDisabled={!GraphStore.hasSelectedFeature()} />
              </div>
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
