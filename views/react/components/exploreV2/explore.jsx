var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var ExploreStore = require('../../stores/exploreStore');

// Components
var TimeSeriesGraph = require('./timeSeriesGraph');
var SelectFeatureDropdown = require('./selectFeatureDropdown');
var ExploreMenu = require('./exploreMenu');
var CorrelateScatterGraph = require('./correlateScatterGraph');
var CorrelateBarGraph = require('./barCorrelateGraph');

var Explore = React.createClass({
  getInitialState:  function () {
    var initialState = {
      viewPortWidth: window.innerWidth,
      viewPortHeight: window.innerHeight,
      currentGraphDisplay: ExploreStore.getCurrentGraphDisplay(),
      currentFeature: { name: 'nothing selected' },
      timeSeriesData: [{ name: 'nothing selected', data: [{ x: 0, y: 0 }] }],
      moodNoteSeriesData: {},
      scatterCompareData: [],
      barCorrelateData: [],
      barCorrelateIsLoading: ExploreStore.getBarCorrelateIsLoading(),
    };

    if (SessionStore.isSignedIn()) {
      initialState.user = SessionStore.currentUser();
    } else {
      initialState.user = null;
    }

    return initialState;
  },

  _onChangeSession: function () {
    this.setState({ user: SessionStore.currentUser() });
  },

  _onChangeExplore: function () {
    this.setState({
      currentGraphDisplay: ExploreStore.getCurrentGraphDisplay(),
      timeSeriesData: ExploreStore.getTimeSeriesData(),
      moodNoteSeriesData: ExploreStore.getMoodNoteSeriesData(),
      scatterCompareData: ExploreStore.getCorrelateScatterData(),
      currentFeature: ExploreStore.getFeature(),
      barCorrelateData: ExploreStore.getBarCorrelateData(),
      barCorrelateIsLoading: ExploreStore.getBarCorrelateIsLoading(),
    });
  },

  handleResize: function () {
    this.setState({ viewPortHeight: window.innerHeight, viewPortWidth: window.innerWidth });
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChangeSession);
    this.exploreToken = ExploreStore.addListener(this._onChangeExplore);
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
    ExploreStore.reset();
    this.exploreToken.remove();
    window.removeEventListener('resize', this.handleResize);
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

  makeExploreGraph: function () {
    var graphWidth = this.calcGraphWidth();
    var graphHeight = this.state.viewPortHeight * 0.7;
    if (this.state.currentGraphDisplay === 'timeSeries') {
      return (
        <TimeSeriesGraph
          data={this.state.timeSeriesData}
          moodNoteData={this.state.moodNoteSeriesData}
          width={graphWidth}
          height={graphHeight}
        />
      );
    } else if (this.state.currentGraphDisplay === 'correlateScatter') {
      return (
        <CorrelateScatterGraph
          data={this.state.scatterCompareData}
          width={graphWidth}
          height={graphHeight}
        />
      );
    } else if (this.state.currentGraphDisplay === 'correlateBar') {
      return (
        <CorrelateBarGraph
          data={this.state.barCorrelateData}
          width={graphWidth}
          height={graphHeight}
          currentFeatureName={this.state.currentFeature.name}
          isLoading={this.state.barCorrelateIsLoading}
        />
      );
    }
  },

  getProcessedUserStreams: function () {
    var userStreams = SessionStore.getUserStreams();
    var processedUserStreams = [];
    for (var i = 0; i < userStreams.length; i++) {
      if (userStreams[i].name != 'DarkSky') {
        processedUserStreams.push(userStreams[i]);
      }
    }

    return processedUserStreams;
  },

  render: function () {
    if (this.state.user) {
      return (
        <div>
          <SelectFeatureDropdown dataStreams={this.getProcessedUserStreams()} />
          <ExploreMenu
            features={SessionStore.getUserFeatures()}
            currentFeatureName={this.state.currentFeature.name}
            currentGraphDisplay={this.state.currentGraphDisplay}
            isDisabled={!ExploreStore.isActive()}
            dataStreams={this.getProcessedUserStreams()}
          />
          <div className="ui bottom attached segment" style={{ backgroundColor: 'white' }}>
            {this.makeExploreGraph()}
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  },
});

module.exports = Explore;
