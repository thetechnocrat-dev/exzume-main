var React = require('react');

var DataStreamItem = React.createClass({

  render: function () {
    var iconClassName = 'large ' + this.props.icon + ' icon';
    return (
      <div className="column">
        <button className="ui labeled basic icon button">
          <i className={iconClassName}></i>
          {this.props.label}
        </button>
      </div>
    );
  },

});

module.exports = DataStreamItem;
