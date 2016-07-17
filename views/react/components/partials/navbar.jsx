var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// components
var LeftNavbarButton = require('./leftNavbarButton');
var MEDIA_PIXEL_CUTOFF = 700;

var navbar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    var initialState = { viewPortWidth: window.innerWidth };

    if (SessionStore.isSignedIn()) {
      initialState.username = SessionStore.currentUsername();
    } else {
      initialState.username = '';
    }

    return initialState;
  },

  _onChange: function () {
    if (SessionStore.isSignedIn()) {
      this.setState({ username: SessionStore.currentUsername() });
    } else {
      this.history.push('/');
    }
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
    this.sessionToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function () {
    this.setState({ viewPortWidth: window.innerWidth });
  },

  clickProfile: function () {
    this.history.push('/profile');
  },

  clickSignout: function () {
    FastFlux.webCycle('get', '/auth/signout', {
      success: this.successCallback,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_DESTROYED',
    });
  },

  // for making navbar non sticky for mobile
  makeNavbarClassName: function () {
    if (this.state.viewPortWidth <= MEDIA_PIXEL_CUTOFF) {
      return 'ui inverted large top menu';
    } else {
      return 'ui inverted large top fixed menu';
    }
  },

  // needed because you cannot add padding to a sticky element
  // so you make a ghost navbar behind it
  makeNavbarPadding: function () {
    if (this.state.viewPortWidth > MEDIA_PIXEL_CUTOFF) {
      return <div className="ui large top menu"></div>;
    }
  },

  render: function () {
    var navbarStyle = { marginBottom: '2%' };
    return (
      <div>
        {this.makeNavbarPadding()}
        <div className={this.makeNavbarClassName()} style={navbarStyle} >
          <div className="ui container">
            <LeftNavbarButton label="Exzume" navigation="/" />
            <LeftNavbarButton label="Dashboard" navigation="/dashboard" />
            <LeftNavbarButton label="Explore" navigation="/" />
            <LeftNavbarButton label="Connect" navigation="/dashboard/connect" />
            <div className="right menu">
              <div className="ui simple dropdown item">
                {this.state.username}
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="item" onClick={this.clickProfile}>Profile</div>
                  <div className="item" onClick={this.clickSignout}>Signout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = navbar;
