var React = require('react');
var SessionStore = require('../../stores/sessionStore');

// Components
var FeaturePanel = require('./featurePanel');
var DataStreamPanel = require('./dataStreamPanel');

var Connect = React.createClass({
  getInitialState: function () {
    // if statement is for incase there is a refresh and page needs a second to get session
    if (SessionStore.isSignedIn()) {
      return { user: SessionStore.currentUser() };
    } else {
      return { user: null };
    }
  },

  _onChange: function () {
    this.setState({ user: SessionStore.currentUser() });
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
        <div>
          <h2 className="ui header">Data Streams</h2>
          <DataStreamPanel user={user} />
          <h2 className="ui header" user={user}>Track a Feature</h2>
          <FeaturePanel user={user} />
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

module.exports = Connect;
