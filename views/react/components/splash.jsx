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

  clickSignUp: function () {
    this.history.push('/signup');
  },

  clickDashboard: function () {
    this.history.push('/dashboard');
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
            <div className="ui yellow button" onClick={this.clickSignUp}>sign up</div>
          </div>
        </div>
      );
    }
  },

  render: function () {
    var centerContainerStyle = { marginTop: '2.5%', marginBottom: '2%', };
    var titleStyle = { fontSize: '3em', };
    var lowerDivStyle = { width: '100%', backgroundColor: '#3BCDBF' };
    var whiteFontStyle = { color: 'white' };

    return (
      <div>
        <div
          className="ui one column center aligned relaxed grid container"
          style={centerContainerStyle}
        >
          <div className="row">
            <h1 className="ui violet huge header" style={titleStyle}>exzume</h1>
          </div>
          {this.makeButtons()}
          <div className="row">
            <canvas id="canvastree" width="700" height="299" />
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
                    1. Sync all the data collecting devices and apps you already use (i.e. fitbit, twitter, github and many more…).
                  </div>
                </div>
                <div className="column">
                  <div style={whiteFontStyle}>
                    2. (Optional) To benefit the most from your data, fill out our recommended 1 minute daily survey based on your interests. Using our survey tool, you can also collect data on anything you are curious about.
                  </div>
                </div>
                <div className="column">
                  <div style={whiteFontStyle}>
                    3. That's it! We do all the data crunching and turn your data into useful insights. (If you are a data guru or want to envision your life as a bunch of lines and graphs, you can either use our built in data explorer or download your data as a csv).
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
