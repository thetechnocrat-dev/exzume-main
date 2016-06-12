var React = require('react');

var InsightItem = React.createClass({
  getInitialState: function () {
    return ({ isLiked: false });
  },

  clickIcon: function () {
    this.setState({ isLiked: !(this.state.isLiked) });
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
