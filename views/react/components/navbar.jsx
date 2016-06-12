var React = require('react');
var History = require('react-router').History;
var AuthActions = require('../actions/authActions');
var AuthStore = require('../stores/authStore');

var Navbar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { currentUser: '' };
  },

  _onChange: function () {
    if (AuthStore.isSignedIn()) {
      this.setState({ currentUser: AuthStore.currentUser().local.username });
    } else {
      this.setState({ currentUser: '' });
    }
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
    if (!AuthStore.isSignedIn()) {
      AuthActions.retrieveSession();
    } else {
      this.setState({ currentUser: AuthStore.currentUser().local.username });
    }
  },

  componentWillUnmount: function () {
    this.authToken.remove();
  },

  clickLogo: function () {
    this.history.push('/');
  },

  clickProfile: function () {
    this.history.push('/profile');
  },

  clickSignout: function () {
    AuthActions.signOut(this.successCallback);
  },

  successCallback: function () {
    this.history.push('/');
  },

  makeUserDropDown: function () {
    if (AuthStore.isSignedIn()) {
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
