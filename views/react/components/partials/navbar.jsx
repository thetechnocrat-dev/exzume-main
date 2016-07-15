var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// components
var LeftNavbarButton = require('./leftNavbarButton');

var navbar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    if (SessionStore.isSignedIn()) {
      return { username: SessionStore.currentUsername() };
    } else {
      return { username: '' };
    }
  },

  _onChange: function () {
    if (SessionStore.isSignedIn()) {
      this.setState({ username: SessionStore.currentUsername() });
    } else {
      this.history.push('/');
    }
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  clickProfile: function () {
    this.history.push('/profile');
  },

  clickSignout: function () {
    FastFlux.webCycle('get', '/auth/signout', {
      success: this.successCallback,
      shouldReceive: true,
      type: 'SESSION_DESTROYED',
    });
  },

  render: function () {
    return (
      <div className='ui inverted large top fixed menu'>
        <div className="ui container">
          <LeftNavbarButton label="Exzume" navigation="/" />
          <LeftNavbarButton label="Explore" navigation="/" />
          <LeftNavbarButton label="Connect" navigation="/" />
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
    );
  },

});

module.exports = navbar;
