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
    this.setState({ currentUser: AuthStore.currentUser().username });
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
    AuthActions.retrieveSession();
  },

  componentWillUnmount: function () {
    this.authToken.remove();
  },

  clickLogo: function () {
    this.history.push('/');
  },

  clickSignout: function () {
    AuthActions.signOut();
  },

  makeUserDropDown: function () {
    if (AuthStore.isSignedIn()) {
      return (
        <div className="ui simple dropdown item">
          {this.state.currentUser}
          <i className="dropdown icon"></i>
          <div className="menu">
            <div className="item">Settings</div>
            <div className="item" onClick={this.clickSignout}>Signout</div>
          </div>
        </div>
      );
    };
  },

  render: function () {
    var menuItemStyle = { cursor: 'pointer' };

    return (
      <div className="ui inverted menu">
        <div className="item" style={menuItemStyle} onClick={this.clickLogo}>Exzume</div>
        <div className="right menu" style={menuItemStyle}>
          {this.makeUserDropDown()}
        </div>
      </div>
    );
  },

});

module.exports = Navbar;
