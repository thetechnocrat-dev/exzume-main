var React = require('react');
var History = require('react-router').History;
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/sessionStore');

var Navbar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { currentUser: '' };
  },

  _onChange: function () {
    if (SessionStore.isSignedIn()) {
      this.setState({ currentUser: SessionStore.currentUser().local.username });
    } else {
      this.setState({ currentUser: '' });
    }
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);

    // check for active session if there is not already an active session
    if (!SessionStore.isSignedIn()) {
      SessionActions.retrieveSession();
    } else {
      this.setState({ currentUser: SessionStore.currentUser().local.username });
    }
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  clickLogo: function () {
    this.history.push('/');
  },

  clickProfile: function () {
    this.history.push('/profile');
  },

  clickSignout: function () {
    SessionActions.signOut(this.successCallback);
  },

  successCallback: function () {
    this.history.push('/');
  },

  makeUserDropDown: function () {
    if (SessionStore.isSignedIn()) {
      return (
        <div className="ui simple dropdown item">
          {this.state.currentUser}
          <i className="dropdown icon"></i>
          <div className="menu">
            <div className="item" onClick={this.clickProfile}>Profile</div>
            <div className="item" onClick={this.clickSignout}>Signout</div>
          </div>
        </div>
      );
    };
  },

  render: function () {
    var menuItemStyle = { cursor: 'pointer' };

    return (
      <div className="ui teal inverted menu">
        <div className="item" style={menuItemStyle} onClick={this.clickLogo}>Exzume</div>
        <div className="right menu" style={menuItemStyle}>
          {this.makeUserDropDown()}
        </div>
      </div>
    );
  },

});

module.exports = Navbar;
