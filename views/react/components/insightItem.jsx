var React = require('react');
var SessionActions = require('../actions/sessionActions');
var FastFlux = require('../util/fastFlux/fastFlux');
var SessionConstants = require('../constants/sessionConstants');

var InsightItem = React.createClass({
  getInitialState: function () {
    return ({ isLiked: this.props.isLiked });
  },

  clickIcon: function () {
    // optimistically changes star color
    var toggledLike = !(this.state.isLiked);
    this.setState({ isLiked: toggledLike });

    var params = {
      username: this.props.username,
      insightId: this.props.id,
      isLiked: toggledLike,
    };

    SessionActions.starInsight(params, this.successCallback, this.errorCallback);
  },

  successCallback: function (resp) {

    // resets session store with updated user object that has correct staring of insights
    FastFlux.webCycle('get', '/auth/session', {
      shouldReceive: true,
      type: SessionConstants.SESSION_RECEIVED,
    });
  },

  errorCallback: function (resp) {
    // revert isLiked state since it was not changed on server
    this.setState({ isLiked: !this.state.isLiked });
    console.log('ajax insight star error', resp);
  },

  makeIcon: function () {
    var style = { cursor: 'pointer' };
    if (this.state.isLiked) {
      return (
        <i className="blue star icon" onClick={this.clickIcon} style={style} />
      );
    } else {
      return (
        <i className="empty star icon" onClick={this.clickIcon} style={style} />
      );
    }
  },

  render: function () {
    return (
      <div className="item">
        {this.makeIcon()}
        <div className="content">
          <div className="header">{this.props.message}</div>
          <div className="description">{this.props.time}</div>
        </div>
      </div>
    );
  },

});

module.exports = InsightItem;
