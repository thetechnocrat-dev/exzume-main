var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

// Components
var Dropdown = require('./dropdown');

var Explore = React.createClass({
  getInitialState: function () {
    if (SessionStore.isSignedIn()) {
      return { user: SessionStore.currentUser() };
    }

    return { user: null };
  },

  makeContent: function () {
    var user = this.state.user;

    if (user) {
      return (
        <div>
          <Dropdown user={user} />
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

module.exports = Explore;
