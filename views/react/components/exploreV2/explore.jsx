var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var ExploreStore = require('../../stores/exploreStore');

// Components
var TimeSeriesGraph = require('./timeSeriesGraph');
var SelectFeatureDropdown = require('./selectFeatureDropdown');

var Explore = React.createClass({
  getInitialState:  function () {
    var initialState = {
      viewPortWidth: window.innerWidth,
      viewPortHeight: window.innerHeight,
      currentGraphDisplay: ExploreStore.getCurrentGraphDisplay(),
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
    this.setState({ currentGraphDisplay: ExploreStore.getCurrentGraphDisplay() });
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
      var data;
      if (ExploreStore.getTimeSeriesData().length === 0) {
        data = [{ name: 'nothing selected', data: [{ x: 0, y: 0 }] }];
      } else {
        data = ExploreStore.getTimeSeriesData();
      }

      return (
        <TimeSeriesGraph
          data={data}
          width={graphWidth}
          height={graphHeight}
        />
      );
    }
  },

  makeContent: function () {
    return (
      <div className="ui bottom attached segment">
        {this.makeExploreGraph()}
      </div>
    );
  },

  render: function () {
    if (this.state.user) {
      return (
        <div>
          <SelectFeatureDropdown features={SessionStore.getUserFeatures()} />
          <div className="ui top attached menu">
            <a className="active item">
              Home
            </a>
          </div>
          {this.makeContent()}
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

