var React = require('react');
var PropTypes = React.PropTypes;

var DropdownItem = React.createClass({

  render: function () {
    return (
      <div>
        <div className="item">{this.props.name}</div>
      </div>
    );
  },

});

module.exports = DropdownItem;
