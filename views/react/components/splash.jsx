var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../stores/sessionStore');
var SessionActions = require('../actions/sessionActions');
var Scroll = require('react-scroll');

var SplashTemp = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({ shouldShowStickyNav: false, viewPortHeight: window.innerHeight, activeNavBarItem: 'home', });
  },

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    console.log('did mount');
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
    var currentPos = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (this.state.shouldShowStickyNav && currentPos < this.state.viewPortHeight) {
      this.setState({ shouldShowStickyNav: false, activeNavBarItem: 'home' });
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

  clickDashboard: function () {
    this.history.push('/dashboard');
  },

  clickSignIn: function () {
    this.history.push('/signin');
  },

  getNavBarClassName: function () {
    if (this.state.shouldShowStickyNav) {
      return 'ui large top fixed menu';
    } else {
      return 'ui large top fixed hidden menu';
    };
  },

  makeStickyNavbar: function () {
    var homeClassName;
    var aboutClassName;
    var contactClassName;
    var navBarClassName = this.getNavBarClassName();

    if (this.state.activeNavBarItem === 'home') {
      homeClassName = 'active item';
      aboutClassName = 'item';
      contactClassName = 'item';
    } else if (this.state.activeNavBarItem === 'about') {
      homeClassName = 'item';
      aboutClassName = 'active item';
      contactClassName = 'item';
    }

    return (
      <div className={navBarClassName}>
        <div className="ui container">
          <a className={homeClassName}>Home</a>
          <a className={aboutClassName}>About</a>
          <a className={contactClassName}>Contact</a>
          <div className="right menu">
            <div className="item">
              <a className="ui button">Sign In</a>
            </div>
            <div className="item">
              <a className="ui primary button">Sign Up</a>
            </div>
          </div>
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

        <div className="ui vertical inverted sidebar menu">
          <a className="active item">Home</a>
          <a className="item">About</a>
          <a className="item">Contact</a>
          <a className="item">Signin</a>
          <a className="item">Signup</a>
        </div>

        <div className="ui inverted vertical masthead center aligned segment" style={mastheadStyle}>

          <div className="ui container">
            <div className="ui large secondary inverted pointing menu">
              <a className="toc item">
                <i className="sidebar icon"></i>
              </a>
              <a className="active item">Home</a>
              <a className="item" onClick={this.clickAbout}>About</a>
              <a className="item">Contact</a>
              <div className="right item">
                <a className="ui inverted button">Sign In</a>
                <a className="ui inverted button">Sign Up</a>
              </div>
            </div>
          </div>

          <div className="ui text container">
            <h1 className="ui inverted header">
              exzume
            </h1>
            <h2>cultivate your data.</h2>
            <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
          </div>

        </div>

        <div id="aboutAnchor" />

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

          {/*<div className="ui vertical stripe quote segment">
            <div className="ui equal width stackable internally celled grid">
              <div className="center aligned row">
                <div className="column">
                  <h3>"What a Company"</h3>
                  <p>That is what they all say about us</p>
                </div>
                <div className="column">
                  <h3>"I shouldn't have gone with their competitor."</h3>
                  <p>
                    <img src="assets/images/avatar/nan.jpg" className="ui avatar image" /> <b>Nan</b> Chief Fun Officer Acme Toys
                    </p>
                  </div>
                </div>
              </div>
            </div>*/}

            <div className="ui vertical stripe segment">
              <div className="ui text container">
                <h3 className="ui header">Why We Made Exzume</h3>
                <p>There are many apps and wearable devices that collect data about our lives. However, this data is hardly ever used to provide actionable insights that we can actualize to improve the quality of our lives. </p>
                <a className="ui large button">Read More</a>
                {/*<h4 className="ui horizontal header divider">
                  <a href="#">Success Stories</a>
                </h4>
                <h3 className="ui header">Did We Tell You About Michael?</h3>
                <p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
                <a className="ui large button">I'm Still Quite Interested</a>
                */}
              </div>
            </div>


            <div className="ui inverted vertical footer segment">
              <div className="ui container">
                <div className="ui stackable inverted divided equal height stackable grid">
                  <div className="three wide column">
                    <h4 className="ui inverted header">About</h4>
                    <div className="ui inverted link list">
                      <a href="#" className="item">Privacy Policy</a>
                      <a href="#" className="item">Contact Us</a>
                    </div>
                  </div>
                  <div className="three wide column">
                    <h4 className="ui inverted header">Services</h4>
                    <div className="ui inverted link list">
                      <a href="https://www.myvessyl.com/" className="item">Vessyl Pre-Order</a>
                      <a href="#" className="item">Exzume FAQ</a>
                    </div>
                  </div>
                  <div className="seven wide column">
                    <h4 className="ui inverted header">© exzume 2016</h4>
                    <p>We could save your life.</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
    );
  },

});

module.exports = SplashTemp;
