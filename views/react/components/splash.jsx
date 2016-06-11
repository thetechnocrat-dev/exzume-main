var React = require('react');
var History = require('react-router').History;
var AuthStore = require('../stores/authstore');
var AuthActions = require('../actions/authActions');

var App = React.createClass({
  mixins: [History],

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
    if (AuthStore.isSignedIn()) {
      return (
        <div className="row">
          <div className="ui button" onClick={this.clickAbout}>about</div>
          <div className="ui button" onClick={this.clickSignOut}>sign out</div>
          <div className="ui button" onClick={this.clickDashboard}>dashboard</div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="ui button" onClick={this.clickAbout}>about</div>
          <div className="ui button" onClick={this.clickSignIn}>sign in</div>
          <div className="ui button" onClick={this.clickSignUp}>sign up</div>
        </div>
      );
    }
  },

  render: function () {
    var centerContainerStyle = { margin: '20%' };

    return (
      <div className="ui one column center aligned grid container" style={centerContainerStyle}>
        <div className="row">
          <h1 className="ui header">exzume</h1>
        </div>
        {this.makeButtons()}
      </div>
    );
  },

});

module.exports = App;
