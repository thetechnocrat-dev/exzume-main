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
      <MoodCard user={this.state.user} />
    );

    if (this.state.user.datastreams.fitbit.isConnected) {
      cards.push(
        <FitbitCard fitbit={this.state.user.datastreams.fitbit} />
      );
    }

    if (this.state.user.datastreams.rescuetime.isConnected) {
      cards.push(
        <RescueTimeCard rescuetime={this.state.user.datastreams.rescuetime} />
      );
    }

    if (this.state.user.datastreams.darksky.isConnected) {
      cards.push(
        <DarkSkyCard darksky={this.state.user.datastreams.darksky} />
      );
    }

    cards.push(
      <ConnectionCard connectedStreams={SessionStore.getUserStreams()} />
    );

    return cards;
  },

  makeColumn: function (columnNum, columnCount, cards) {
    // so that when i % columnCount equals zero it will go in last column
    if (columnNum === columnCount) {
      columnNum = 0;
    }

    console.log(columnNum);

    var cardsFilterd = cards.filter(function (card, i) {
      console.log((i + 1) % columnCount === columnNum);
      return (i + 1) % columnCount === columnNum;
    });

    console.log(cards);
    console.log(cardsFilterd);
    return cardsFilterd;
  },

  makeColumns: function (columnCount, rowClassName, cards) {
    if (columnCount === 1) {
      return (
        <div className={rowClassName}>
          <div className="column">
            {this.makeColumn(1, columnCount, cards)}
          </div>
        </div>
      );
    } else if (columnCount === 2) {
      return (
        <div className={rowClassName}>
          <div className="column">
            {this.makeColumn(1, columnCount, cards)}
          </div>
          <div className="column">
            {this.makeColumn(2, columnCount, cards)}
          </div>
        </div>
      );
    } else if (columnCount === 3) {
      return (
        <div className={rowClassName}>
          <div className="column">
            {this.makeColumn(1, columnCount, cards)}
          </div>
          <div className="column">
            {this.makeColumn(2, columnCount, cards)}
          </div>
          <div className="column">
            {this.makeColumn(3, columnCount, cards)}
          </div>
        </div>
      );
    } else if (columnCount === 4) {
      return (
        <div className={rowClassName}>
          <div className="column">
            {this.makeColumn(1, columnCount, cards)}
          </div>
          <div className="column">
            {this.makeColumn(2, columnCount, cards)}
          </div>
          <div className="column">
            {this.makeColumn(3, columnCount, cards)}
          </div>
          <div className="column">
            {this.makeColumn(4, columnCount, cards)}
          </div>
        </div>
      );
    }
  },

  makeContent: function () {
    var user = this.state.user;

    // cutoffs are used to match semantic UI's container size
    var LARGE_MONITOR = 1200;
    var SMALL_MONITOR = 992;
    var TABLET = 768;
    var rowClassName;
    var columnCount;

    if (this.state.viewPortWidth > LARGE_MONITOR) {
      rowClassName = 'four column row';
      columnCount = 4;
    } else if (this.state.viewPortWidth > SMALL_MONITOR) {
      rowClassName = 'three column row';
      columnCount = 3;
    } else if (this.state.viewPortWidth > TABLET) {
      rowClassName = 'two column row';
      columnCount = 2;
    } else {
      rowClassName = 'one column row';
      columnCount = 1;
    }

    if (user) {
      var cards = this.makeCards();
      return (
        <div className="ui container">
          <div className="ui grid">
            {this.makeColumns(columnCount, rowClassName, cards)}
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

