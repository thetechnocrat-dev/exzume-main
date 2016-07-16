var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var footer = React.createClass({
  _onChange: function () {
    this.forceUpdate();
  },

  componentWillMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);

    // check for active session if there is not already an active session
    if (!SessionStore.isSignedIn()) {
      FastFlux.webCycle('get', '/auth/session', {
        shouldReceive: true,
        type: 'SESSION_RECEIVED',
      });
    };
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  render: function () {
    var containerStyle = { width: '100vw', backgroundColor: 'black', marginTop: '2%' };
    return (
      <div style={containerStyle}>
        <div className="ui inverted vertical footer segment">
          <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
              <div className="three wide column">
                <h4 className="ui inverted header">Company</h4>
                <div className="ui inverted link list">
                  <a className="item">Privacy Policy</a>
                  <a href="mailto:exzume.app@gmail.com" className="item">Contact Us</a>
                </div>
              </div>
              <div className="three wide column">
                <h4 className="ui inverted header">Services</h4>
                <div className="ui inverted link list">
                  <a href="https://www.myvessyl.com/" className="item">Vessyl Pre-Order</a>
                  <a className="item">Exzume FAQ</a>
                </div>
              </div>
              <div className="seven wide column">
                <h4 className="ui inverted header">© exzume 2016</h4>
                <p>“We become what we repeatedly do.” ― Sean Covey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = footer;
