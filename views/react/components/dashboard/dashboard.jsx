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
    if (SessionStore.isSignedIn()) {
      return { user: SessionStore.currentUser() };
    } else {
      return { user: null };
    }
  },

  _onChange: function () {
    if (SessionStore.isSignedIn()) {
      this.setState({ user: SessionStore.currentUser() });
    } else {
      this.history.push('/');
    }
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  makeDarkSkyCard: function () {
    if (this.state.user.datastreams.darksky.isConnected) {
      return (
        <DarkSkyCard darksky={this.state.user.datastreams.darksky} />
      );
    }
  },

  makeConnectionCard: function () {
    var connectedStreams = SessionStore.getUserStreams();

    return (
      <ConnectionCard connectedStreams={connectedStreams} />
    );
  },

  makeRescueTimeCard: function () {
    if (this.state.user.datastreams.rescuetime.isConnected) {
      return (
        <RescueTimeCard rescuetime={this.state.user.datastreams.rescuetime} />
      );
    }
  },

  makeFitbitCard: function () {
    if (this.state.user.datastreams.fitbit.isConnected) {
      return (
        <FitbitCard fitbit={this.state.user.datastreams.fitbit} />
      );
    }
  },

  makeContent: function () {
    var user = this.state.user;

    // only render content if there is a session
    if (user) {
      return (
        <div className="ui container">
          <div className="ui three column stackable grid">
            <div className="column">
              <MoodCard user={user} />
              {this.makeDarkSkyCard()}
            </div>
            <div className="column">
              {this.makeFitbitCard()}
            </div>
            <div className="column">
              {this.makeRescueTimeCard()}
              {this.makeConnectionCard()}
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

