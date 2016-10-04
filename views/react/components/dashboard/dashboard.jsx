var React = require('react');
var SessionStore = require('../../stores/sessionStore');

// Components
var MoodCard = require('./moodCard');
var DarkSkyCard = require('./darkSkyCard');
var RescueTimeCard = require('./rescueTimeCard');
var InsightCard = require('./insightCard');
var ConnectionCard = require('./connectionCard');
var FitbitCard = require('./fitbitCard');

var Dashboard = React.createClass({

  getInitialState: function () {
    var initialState = {
      viewPortWidth: window.innerWidth,
      viewPortHeight: window.innerHeight,
    };

    if (SessionStore.isSignedIn()) {
      initialState.user = SessionStore.currentUser();
    } else {
      initialState.user = null;
    }

    return initialState;
  },

  _onChange: function () {
    if (SessionStore.isSignedIn()) {
      this.setState({ user: SessionStore.currentUser() });
    } else {
      this.history.push('/');
    }
  },

  handleResize: function () {
    this.setState({ viewPortHeight: window.innerHeight, viewPortWidth: window.innerWidth });
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
    window.removeEventListener('resize', this.handleResize);
  },

  makeCards: function () {
    var cards = [];

    // the order you put cards here is the same order they will be going left to right
    cards.push(
      <div className="column" key={'mood'}>
        <MoodCard user={this.state.user} />
      </div>
    );

    if (this.state.user.datastreams.fitbit.isConnected) {
      cards.push(
        <div className="column" key={'fitbit'}>
          <FitbitCard fitbit={this.state.user.datastreams.fitbit} />
        </div>
      );
    }

    if (this.state.user.datastreams.rescuetime.isConnected) {
      return (
        <div className="column" key={'rescuetime'}>
          <RescueTimeCard rescuetime={this.state.user.datastreams.rescuetime} />
        </div>
      );
    }

    if (this.state.user.datastreams.darksky.isConnected) {
      return (
        <div className="column" key={'darksky'}>
          <DarkSkyCard darksky={this.state.user.datastreams.darksky} />
        </div>
      );
    }

    cards.push(
      <div className="column" key={'connect'}>
        <ConnectionCard connectedStreams={SessionStore.getUserStreams()} />
      </div>
    );

    return cards;
  },

  makeContent: function () {
    var user = this.state.user;

    // cutoffs are used to match semantic UI's container size
    var LARGE_MONITOR = 1200;
    var SMALL_MONITOR = 992;
    var TABLET = 768;

    if (this.state.viewPortWidth > LARGE_MONITOR) {
      rowClassName = 'four column row';
    } else if (this.state.viewPortWidth > SMALL_MONITOR) {
      rowClassName = 'three column row';
    } else if (this.state.viewPortWidth > TABLET) {
      rowClassName = 'two column row';
    } else {
      rowClassName = 'one column row';
    }

    if (user) {
      return (
        <div className="ui container">
          <div className="ui grid">
            <div className={rowClassName}>
              {this.makeCards()}
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

module.exports = Dashboard;

