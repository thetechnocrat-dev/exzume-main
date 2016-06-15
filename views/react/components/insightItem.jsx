var React = require('react');
var AuthActions = require('../actions/authActions');

var InsightItem = React.createClass({
  getInitialState: function () {
    return ({ isLiked: false });
  },

  clickIcon: function () {
    // optimistically changes star color
    this.setState({ isLiked: !(this.state.isLiked) });
    console.log(this.props.id, this.props.username);

    var params = { username: this.props.username, insightId: this.props.id };

    AuthActions.starInsight(params, this.successCallback, this.errorCallback);
  },

  successCallback: function (resp) {
    console.log('ajax insight star success', resp);
  },

  errorCallback: function (resp) {
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
