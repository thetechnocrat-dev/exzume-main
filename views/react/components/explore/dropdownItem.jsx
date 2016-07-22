var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var DropdownItem = React.createClass({
  propTypes: {
    userFeature: React.PropTypes.object.isRequired,
  },

  clickItem: function () {
    FastFlux.cycle('FEATURE_RECEIVED', this.props.userFeature);
  },

  render: function () {
    return (
      <div className="item" onClick={this.clickItem}>{this.props.userFeature.name}</div>
    );
  },

});

module.exports = DropdownItem;
