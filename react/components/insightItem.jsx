var React = require('react');

var InsightItem = React.createClass({

  render: function () {
    return (
      <div className="item">
        <i className="heart" />
        <div className="content">
          <div className="header">{this.props.message}</div>
          <div className="description">{this.props.time}</div>
        </div>
      </div>
    );
  },

});

module.exports = InsightItem;
