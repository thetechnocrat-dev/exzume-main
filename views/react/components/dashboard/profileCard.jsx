var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var ProfileCard = React.createClass({

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

  render: function () {
    var statisticRightPadding = { paddingRight: '10%' };
    var statisticLeftPadding = { paddingLeft: '10%' };

    return (
      <div className="four wide column">
        <h1 className="ui center aligned icon header">
          <i className="circular big user icon"></i>
          {this.state.user.local.username}
        </h1>
        <div className="ui center aligned grid container">
          <div className="two column row">
            <div className="ui statistics">
              <div className="one wide column" style={statisticRightPadding}>
                <div className="statistic">
                  <div className="value">
                    15
                  </div>
                  <div className="label">
                    Features
                  </div>
                </div>
              </div>
              <div className="one wide column" style={statisticLeftPadding}>
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
      </div>
    );
  },

});

module.exports = ProfileCard;
