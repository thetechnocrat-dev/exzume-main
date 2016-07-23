var React = require('react');
var SessionStore = require('../../stores/sessionStore');

// Components
var ProfilePanel = require('./profilePanel');
var ZumePanel = require('./zumePanel');
var SurveyPanel = require('./surveyPanel');

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
          <ProfilePanel
            user={user}
            userFeatures={SessionStore.getUserFeatures()}
            userStreams={SessionStore.getUserStreams()}
          />
          <ZumePanel user={user} />
          <SurveyPanel user={user} />
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
