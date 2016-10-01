var React = require('react');
var SessionStore = require('../../stores/sessionStore');

// Components
var ProfilePanel = require('./profilePanel');
var ZumePanel = require('./zumePanel');
var SurveyPanel = require('./surveyPanel');
var MoodCard = require('./moodCard');
var DarkSkyCard = require('./darkSkyCard');
var RescueTimeCard = require('./rescueTimeCard');
var InsightCard = require('./insightCard');
var ConnectionCard = require('./connectionCard');
var FitnessCard = require('./fitnessCard');
var SleepCard = require('./sleepCard');

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
              <FitnessCard
                currentSteps={7544}
                avgSteps={8969}
                currentActiveMinutes={24}
                avgActiveMinutes={54}
                currentFloors={18}
                avgFloors={23}
                exercisesThisWeek={3}
                avgExercisesPerWeek={5}
              />
            </div>
            <div className="column">
              <SleepCard
                wakeUpTime={'7:28am'}
                avgWakeUpTime={'8:26am'}
                bedTime={'12:50am'}
                avgBedTime={'12:46am'}
                currentSleepEfficiency={96}
                avgSleepEfficiency={95}
                currentTimeToFallAsleep={12}
                avgTimeToFallAsleep={21}
                currentAwakenings={5}
                avgAwakenings={3}
                currentMinutesNapping={0}
                avgMinutesNapping={9}
              />
            </div>
            <div className="column">
              {this.makeConnectionCard()}
            </div>
            <div className="two wide column">
              {this.makeRescueTimeCard()}
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
