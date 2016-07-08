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
    var bodyMessage = 'Thank you for your interest in exzume! We will notify you by replying to this email when beta access is available. If you have time we would love to hear why you are interested.';
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
    var buttonFrontStyle = { color: 'white', };
    if (SessionStore.isSignedIn()) {
      return (
        <div className="row">
          <div>
            <div
              className="ui green button"
              onClick={this.clickAbout}
              style={buttonFrontStyle}
            >
            about
          </div>
          </div>
          <div style={marginStyle}>
            <div
              className="ui green button"
              onClick={this.clickSignOut}
              style={buttonFrontStyle}
            >
              sign out
            </div>
          </div>
          <div style={marginStyle}>
            <div className="ui red button"
              onClick={this.clickDashboard}
              style={buttonFrontStyle}
            >
              dashboard
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div>
            <div
              className="ui green button"
              onClick={this.clickAbout}
              style={buttonFrontStyle}
            >
              about
            </div>
          </div>
          <div style={marginStyle}>
            <div
              className="ui green button"
              onClick={this.clickSignIn}
              style={buttonFrontStyle}
            >
              sign in
            </div>
          </div>
          <div style={marginStyle}>
            <div className="ui red button"
              onClick={this.clickBetaAccess}
              style={buttonFrontStyle}
            >
            request beta
          </div>
          </div>
        </div>
      );
    }
  },

  render: function () {
    var titleStyle = { fontSize: '3em', marginTop: '2.5%', };
    var dividerStyle = { width: '100%', height: '300px', backgroundColor: '#2B9464', marginBottom: '5%', };
    var panelStyle = { color: 'black' };
    var lightBackgroundStyle = { backgroundColor: '#white' };
    var stepStyle = { fontSize: '1.5em', };

    return (
      <div style={lightBackgroundStyle}>
        <div
          className="ui one column center aligned relaxed grid container"
        >
          <div className="row">
            <h1 className="ui blue huge header" style={titleStyle}>exzume</h1>
          </div>
          {this.makeButtons()}
          <div className="row">
            <canvas id="canvastree" width="400" height="299" />
          </div>
        </div>
        <div style={dividerStyle} />
        <div id="aboutAnchor">
          <div
            className="ui center aligned grid container"
          >
              <div className="three column stackable row">

                <div className="column">
                  <div style={panelStyle}>
                    <div class="row">
                      <i className="huge refresh icon"></i>
                    </div>
                    <div class="row">
                      <b style={stepStyle}>Sync devices & apps you already use (e.g. Fitbit, Spotify, RescueTime).</b>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div style={panelStyle}>
                    <div class="row">
                      <i className="huge list layout icon"></i>
                    </div>
                    <div class="row">
                      <b style={stepStyle}>Fill out a short daily survey customized for you.</b>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div style={panelStyle}>
                    <div class="row">
                      <i className="huge checkmark icon"></i>
                    </div>
                    <div class="row">
                      <b style={stepStyle}>That's it! We do all the data crunching & turn your data into useful insights.</b>
                    </div>
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
