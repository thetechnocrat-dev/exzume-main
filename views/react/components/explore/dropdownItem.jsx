var React = require('react');
var PropTypes = React.PropTypes;

var DropdownItem = React.createClass({

  render: function () {
    return (
      <div>
        <div className="item">{this.props.featureName}</div>
        <p>date array: {this.props.dates.toString()}</p>
        <p>data array: {this.props.data.toString()}</p>
      </div>
    );
  },

});

module.exports = DropdownItem;
