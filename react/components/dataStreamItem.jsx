var React = require('react');

var DataStreamItem = React.createClass({

  render: function () {
    var iconClassName = 'huge ' + this.props.icon + ' icon';
    return (
      <div className="column">
        <i className={iconClassName}></i>
      </div>
    );
  },

});

module.exports = DataStreamItem;
