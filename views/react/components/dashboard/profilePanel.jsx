var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var ProfilePanel = React.createClass({

  getInitialState: function () {
    if (SessionStore.isSignedIn()) {
      return { user: SessionStore.currentUser() };
    } else {
      return { user: { local: { username: '' } } };
    }
  },

  _onChange: function () {
    if (SessionStore.isSignedIn()) {
      this.setState({ user: SessionStore.currentUser() });
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

  showConnectedStream: function () {
    if (this.state.user.fitbit) {

    }
  },

  render: function () {
    var profilePadding = { paddingTop: '7%' };
    return (
      <div className="ui stackable grid container" style={profilePadding}>
        <div className="row">
          <div className="four wide column">
            <h1 className="ui center aligned icon header">
              <i className="circular big user icon"></i>
              {this.state.user.local.username}
            </h1>
            <div className="ui center aligned grid container">
              <div className="row">
                <div className="ui statistics">
                  <div className="statistic">
                    <div className="value">
                      15
                    </div>
                    <div className="label">
                      Features
                    </div>
                  </div>
                  <div className="statistic">
                    <div className="value">
                      7
                    </div>
                    <div className="label">
                      Zumes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="twelve wide column">

          </div>
        </div>
      </div>
    );
  },

});

module.exports = ProfilePanel;
