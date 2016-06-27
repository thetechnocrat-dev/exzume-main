var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../stores/sessionStore');
var SessionActions = require('../actions/sessionActions');
var TreeCanvas = require('../util/canvas/tree');
var scrollIntoView = require('scroll-into-view');

// components
var AboutSplash = require('./aboutSplash');

var App = React.createClass({
  mixins: [History],

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);

    // check for active session if there is not already an active session
    if (!SessionStore.isSignedIn()) {
      SessionActions.retrieveSession();
    };

    TreeCanvas();
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  clickAbout: function () {
    var element = document.getElementById('aboutAnchor');
    scrollIntoView(element);
  },

  clickSampleAccount: function () {
    this.history.push('/dashboard');
  },

  clickSignIn: function () {
    this.history.push('/signin');
  },

  // clickSignUp: function () {
  //   this.history.push('/signup');
  // },

  clickDashboard: function () {
    this.history.push('/dashboard');
  },

  clickBetaAccess: function () {
    var bodyMessage = 'Thank you for your interest in exzume! We will notify you by replying to this email when beta access is avaible. If you have time we would love to hear why you are interested.';
    var email = 'exzume.app@gmail.com';
    var subject = 'exzume beta access';
    document.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + bodyMessage;
  },

  clickSignOut: function () {
    SessionActions.signOut(this.successCallback);
  },

  successCallback: function () {
    this.history.push('/');
  },

  makeButtons: function () {
    var marginStyle = { marginLeft: '5%' };
    if (SessionStore.isSignedIn()) {
      return (
        <div className="row">
          <div>
            <div className="ui teal button" onClick={this.clickAbout}>about</div>
          </div>
          <div style={marginStyle}>
            <div className="ui teal button" onClick={this.clickSignOut}>sign out</div>
          </div>
          <div style={marginStyle}>
            <div className="ui yellow button" onClick={this.clickDashboard}>dashboard</div>
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
            <div className="ui yellow button" onClick={this.clickBetaAccess}>request beta</div>
          </div>
        </div>
      );
    }
  },

  render: function () {
    var titleStyle = { fontSize: '3em', marginTop: '2.5%', };
    var lowerDivStyle = { width: '100%', backgroundColor: '#3BCDBF' };
    var whiteFontStyle = { color: 'white' };
    var backgroundStyle = { backgroundColor: '#f4f1f0' };
    var stepStyle = { fontSize: '1.5em', };

    return (
      <div style={backgroundStyle}>
        <div
          className="ui one column center aligned relaxed grid container"
        >
          <div className="row">
            <h1 className="ui violet huge header" style={titleStyle}>exzume</h1>
          </div>
          {this.makeButtons()}
          <div className="row">
            <canvas id="canvastree" width="400" height="299" />
          </div>
        </div>
        <div
          id="aboutAnchor"
          style={lowerDivStyle}
        >
          <div
            className="ui center aligned grid container"
          >
            <div className="one column stackable row">
              <div className="column">
                <h1 className="ui huge header" style={whiteFontStyle}>
                  How to use your data to make better decisions with exzume
                </h1>
              </div>
            </div>
              <div className="three column stackable row">
                <div className="column">
                  <div style={whiteFontStyle}>
                    <b style={stepStyle}>1. Sync data collecting devices and apps</b> you already use (i.e. fitbit, twitter, github and many more…).
                  </div>
                </div>
                <div className="column">
                  <div style={whiteFontStyle}>
                    <b style={stepStyle}>2. (Recommended) Fill out a 1 minute daily survey</b> designed off your interestes to get the most out of your data. Using our survey tool, you can collect data on anything you are curious about.
                  </div>
                </div>
                <div className="column">
                  <div style={whiteFontStyle}>
                    <b style={stepStyle}>3. That's it!</b> We do all the data crunching and turn your data into useful insights. (If you are a data guru or want to envision your life as a bunch of lines and graphs, you can either use our built in data explorer or download your data as a csv).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  },

});

module.exports = App;
