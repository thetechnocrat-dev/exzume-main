var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var ProfileCard = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    userFeatures: React.PropTypes.array.isRequired,
  },

  render: function () {
    console.log(this.props);
    var statisticRightPadding = { paddingRight: '7%' };
    var statisticLeftPadding = { paddingLeft: '7%' };

    return (
      <div className="four wide column">
        <h1 className="ui center aligned icon header">
          <i className="circular big user icon"></i>
          {this.props.user.local.username}
        </h1>
        <div className="ui center aligned grid container">
          <div className="two column row">
            <div className="ui statistics">
              <div className="one wide column" style={statisticRightPadding}>
                <div className="statistic">
                  <div className="value">
                    {this.props.userFeatures.length}
                  </div>
                  <div className="label">
                    Features
                  </div>
                </div>
              </div>
              <div className="one wide column" style={statisticLeftPadding}>
                <div className="statistic">
                  <div className="value">
                    {this.props.user.zumes.length}
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
