var React = require('react');
var History = require('react-router').History;
var AuthStore = require('../stores/authStore');
var AuthActions = require('../actions/authActions');

// components

var App = React.createClass({
  mixins: [History],

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);

    // check for active session if there is not already an active session
    if (!AuthStore.isSignedIn()) {
      AuthActions.retrieveSession();
    };
  },

  componentWillUnmount: function () {
    this.authToken.remove();
  },

  clickAbout: function () {
    this.history.push('/about');
  },

  clickSampleAccount: function () {
    this.history.push('/dashboard');
  },

  clickSignIn: function () {
    this.history.push('/signin');
  },

  clickSignUp: function () {
    this.history.push('/signup');
  },

  clickDashboard: function () {
    this.history.push('/dashboard');
  },

  clickSignOut: function () {
    AuthActions.signOut(this.successCallback);
  },

  successCallback: function () {
    this.history.push('/');
  },

  makeButtons: function () {
    var marginStyle = { marginLeft: '5%' };
    if (AuthStore.isSignedIn()) {
      return (
        <div className="row">
          <div>
            <div className="ui teal button" onClick={this.clickAbout}>about</div>
          </div>
          <div style={marginStyle}>
            <div className="ui teal button" onClick={this.clickSignOut}>sign out</div>
          </div>
          <div style={marginStyle}>
            <div className="ui teal button" onClick={this.clickDashboard}>dashboard</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div>
            <div className="ui teal button" onClick={this.clickAbout}>about</div>
          </div>
          <div style={marginStyle}>
            <div className="ui teal button" onClick={this.clickSignIn}>sign in</div>
          </div>
          <div style={marginStyle}>
            <div className="ui teal button" onClick={this.clickSignUp}>sign up</div>
          </div>
        </div>
      );
    }
  },

  render: function () {
    var centerContainerStyle = { marginTop: '20%', marginBottom: '2%', };

    return (
      <div>
        <div className="ui one column center aligned relaxed grid container" style={centerContainerStyle}>
          <div className="row">
            <h1 className="ui blue huge header">exzume</h1>
          </div>
          {this.makeButtons()}
        </div>
      </div>
    );
  },

});

module.exports = App;
