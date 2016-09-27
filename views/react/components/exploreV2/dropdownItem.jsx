var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var DropdownItem = React.createClass({
  propTypes: {
    feature: React.PropTypes.object.isRequired,
  },

  clickItem: function () {
    FastFlux.cycle('FEATURE_RECEIVED', this.props.feature);
  },

  render: function () {
    return (
      <div className="item" onClick={this.clickItem}>
        {this.props.feature.name}
      </div>
    );
  },

});

module.exports = DropdownItem;

