var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var SelectedFeatureMenuItem = React.createClass({
  propTypes: {
    feature: React.PropTypes.object.isRequired,
  },

  clickRemove: function () {
    FastFlux.cycle('FEATURE_REMOVED', this.props.feature);
  },

  render: function () {
    style = { margin: '2% 2% 0 0' };
    return (
      <div className="ui green label" style={style}>
        {this.props.feature.name}
        <i className="delete icon" onClick={this.clickRemove} />
      </div>
    );
  },

});

module.exports = SelectedFeatureMenuItem;

