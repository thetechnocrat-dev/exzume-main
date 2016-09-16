var React = require('react');
var SessionStore = require('../../stores/sessionStore');

// Components
var ProfilePanel = require('./profilePanel');
var ZumePanel = require('./zumePanel');
var SurveyPanel = require('./surveyPanel');
var MoodCard = require('./moodCard');
var ProductivityCard = require('./productivityCard');
var InsightCard = require('./insightCard');
var ConnectionCard = require('./connectionCard');

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

  makeContent: function () {
    var user = this.state.user;

    // only render content if there is a session
    if (user) {
      return (
        <div className="ui container">
          <div className="ui three column stackable grid">
            <div className="column">
              <MoodCard user={user} />
            </div>
            <div className="column">
              <InsightCard insights={
                [
                  { text: 'Your steps have trended significantly below average the last 5 days',
                    info: 'Your exercise is highly correlated with getting more steps' },
                  { text: 'Your productivity has trended signficantly above average the last 3 days',
                    info: 'Your caffeine consumption has also trended significantly above average the last 3 days' },
                  { text: 'Your mood has trended significantly doward the last 4 days', 
                    info: 'click here to see notes you wrote on previous days were you had a high mood' },
                  { text: 'You have less awakenings at night when you go to sleep later',
                    info: 'no additional info found for this insight' },
                ]}
              />
            </div>
            <div className="column">
              <ProductivityCard
                currentProductiveTime={4}
                currentDistractingTime={5}
                currentNeautralTime={0.5}
                avgProductiveTime={3.8}
                avgDistractingTime={2}
                avgNeautralTime={0.3}
              />
            </div>
            <div className="column">
              <ConnectionCard
                userStreams={[1, 2, 3, 4, 5]}
              />
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
