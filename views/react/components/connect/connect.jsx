var React = require('react');
var SessionStore = require('../../stores/sessionStore');

// Components
var AppPanel = require('./appPanel');

var Connect = React.createClass({
  getInitialState: function () {
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

    // only render if there is a session
    if (user) {
      return (
        <div>
          <AppPanel user={user} />
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
