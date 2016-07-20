var React = require('react');
var PropTypes = React.PropTypes;
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var DropdownItem = React.createClass({
  onClick: function () {
    var data = {
      dates: this.props.dates,
      data: this.props.data,
    };
    FastFlux.cycle('FEATURE_RECEIVED', data);
  },

  render: function () {
    return (
      <div className="item" onClick={this.onClick}>{this.props.name}</div>
    );
  },

});

module.exports = DropdownItem;
