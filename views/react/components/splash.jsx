var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../stores/sessionStore');
var SessionActions = require('../actions/sessionActions');
var Scroll = require('react-scroll');
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/sessionStore');

// components
var SideNavbar = require('./sideNavbar');
var Footer = require('./footer');

var Splash = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({ shouldShowStickyNav: false, viewPortHeight: window.innerHeight, activeNavBarItem: 'home', });
  },

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.sessionToken = SessionStore.addListener(this._onChange);

    // check for active session if there is not already an active session
    if (!SessionStore.isSignedIn()) {
      SessionActions.retrieveSession();
    };
  },

  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    this.sessionToken.remove();
  },

  handleScroll: function () {
    var doc = document.documentElement;
    var maxScroll = doc.scrollHeight;
    var currentPos = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (this.state.shouldShowStickyNav && currentPos < this.state.viewPortHeight) {
      this.setState({ shouldShowStickyNav: false, activeNavBarItem: 'home' });
    } else if (currentPos === (maxScroll - this.state.viewPortHeight)) {
      this.setState({ shouldShowStickyNav: true, activeNavBarItem: 'contact' });
    } else if (currentPos > this.state.viewPortHeight) {
      this.setState({ shouldShowStickyNav: true, activeNavBarItem: 'about' });
    }
  },

  handleResize: function () {
    var viewPortHeight = window.innerHeight;
    this.setState({ viewPortHeight: viewPortHeight });
  },

  clickAbout: function () {
    var SCROLL_PADDING = 1.05;
    Scroll.animateScroll.scrollTo(this.state.viewPortHeight * SCROLL_PADDING);
  },

  clickHome: function () {
    Scroll.animateScroll.scrollTo(0);
  },

  clickContact: function () {
    var maxScroll = document.documentElement.scrollHeight;
    Scroll.animateScroll.scrollTo(maxScroll);
  },

  clickBetaAccess: function () {
    var bodyMessage = 'Thank you for your interest in exzume! We will notify you by replying to this email when beta access is available. If you have time we would love to hear why you are interested.';
    var email = 'exzume.app@gmail.com';
    var subject = 'exzume beta access';
    document.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + bodyMessage;
  },

  clickDashboard: function () {
    this.history.push('/dashboard');
  },

  clickSignIn: function () {
    this.history.push('/signin');
  },

  clickSignOut: function () {
    SessionActions.signOut(this.successCallback);
  },

  successCallback: function () {
    this.history.push('/');
  },

  makeTopNavBarRightButtons: function () {
    if (SessionStore.isSignedIn()) {
      return (
        <div className="right item">
          <a className="ui inverted button" onClick={this.clickSignOut}>Sign Out</a>
          <a className="ui inverted button" onClick={this.clickDashboard}>Dashboard</a>
        </div>
      );
    } else {
      return (
        <div className="right item">
          <a className="ui inverted button" onClick={this.clickSignIn}>Sign In</a>
          <a className="ui inverted button" onClick={this.clickBetaAccess}>Request Beta</a>
        </div>
      );
    }
  },

  makeTopNavBar: function () {
    return (
      <div className="ui container">
        <div className="ui large secondary inverted pointing menu">
          {/*<a className="toc item">
            <i className="sidebar icon"></i>
          </a>*/}
          <a className="active item" onClick={this.clickHome}>Home</a>
          <a className="item" onClick={this.clickAbout}>About</a>
          <a className="item" onClick={this.clickContact}>Contact</a>
          {this.makeTopNavBarRightButtons()}
        </div>
      </div>
    );
  },

  getStickNavBarClassName: function () {
    if (this.state.shouldShowStickyNav) {
      return 'ui large top fixed menu';
    } else {
      return 'ui large top fixed hidden menu';
    };
  },

  makeStickyNavRightButtons: function () {
    if (SessionStore.isSignedIn()) {
      return (
        <div className="right menu">
          <div className="item">
            <a className="ui button" onClick={this.clickSignout}>Sign Out</a>
          </div>
          <div className="item">
            <a className="ui primary button" onClick={this.clickDashboard}>Dashboard</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="right menu">
          <div className="item">
            <a className="ui button" onClick={this.clickSignIn}>Sign In</a>
          </div>
          <div className="item">
            <a className="ui primary button" onClick={this.clickBetaAccess}>Request Beta</a>
          </div>
        </div>
      );
    }
  },

  makeStickyNavbar: function () {
    var homeClassName;
    var aboutClassName;
    var contactClassName;
    var navBarClassName = this.getStickNavBarClassName();

    if (this.state.activeNavBarItem === 'home') {
      homeClassName = 'active item';
      aboutClassName = 'item';
      contactClassName = 'item';
    } else if (this.state.activeNavBarItem === 'about') {
      homeClassName = 'item';
      aboutClassName = 'active item';
      contactClassName = 'item';
    } else if (this.state.activeNavBarItem === 'contact') {
      homeClassName = 'item';
      aboutClassName = 'item';
      contactClassName = 'active item';
    }

    return (
      <div className={navBarClassName}>
        <div className="ui container">
          <a className={homeClassName} onClick={this.clickHome}>Home</a>
          <a className={aboutClassName} onClick={this.clickAbout}>About</a>
          <a className={contactClassName} onClick={this.clickContact}>Contact</a>
          {this.makeStickyNavRightButtons()}
        </div>
      </div>
    );
  },

  render: function () {
    var stepsContainerStyle = { marginTop: '5%', };
    var stepStyle = { fontSize: '1.5em', };
    var panelStyle = { color: '#black' };
    var mastheadStyle = { height: this.state.viewPortHeight };

    return (
      <div>
        {this.makeStickyNavbar()}

        <SideNavbar />

        <div className="pusher">
          <div className="ui inverted vertical masthead center aligned segment" style={mastheadStyle}>

            {this.makeTopNavBar()}

            <div className="ui text container">
              <h1 className="ui inverted header">
                exzume
              </h1>
              <h2>cultivate your data.</h2>
              <div className="ui huge primary button" onClick={this.clickAbout}>Learn More<i className="right arrow icon"></i></div>
            </div>
          </div>

          <div id="aboutAnchor" ></div>

          <div className="ui vertical stripe segment">
            <div className="ui center aligned stackable grid container">
              <div className="row">
                <div className="sixteen wide column">
                  <h1 className="ui header">Exzume Creates Useful Insights from Your Data</h1>
                  <h2 className="ui header">Here's How to Use It...</h2>
                </div>
                <div className="ui center aligned grid container" style={stepsContainerStyle}>
                  <div className="three column stackable row">

                    <div className="column">
                      <div style={panelStyle}>
                        <i className="massive refresh icon"></i>
                        <h2>Sync devices & apps you already use (e.g. Fitbit, Spotify, RescueTime).</h2>
                      </div>
                    </div>

                    <div className="column">
                      <div style={panelStyle}>
                        <i className="massive list layout icon"></i>
                        <h2>Fill out a short daily survey dynamically customized for you.</h2>
                      </div>
                    </div>

                    <div className="column">
                      <div style={panelStyle}>
                        <i className="massive checkmark icon"></i>
                        <h2>That's it! We do all the data crunching & turn your data into useful insights.</h2>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ui vertical stripe segment">
            <div className="ui text container">
              <h3 className="ui header">Why We Made Exzume</h3>
              <p>There are many apps and wearable devices that collect data about our lives. However, this data is hardly ever used to provide actionable insights that we can actualize to improve the quality of our lives. </p>
            </div>
          </div>

        <Footer />
        </div>
      </div>
    );
  },

});

module.exports = Splash;
