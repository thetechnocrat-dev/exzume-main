var React = require('react');

// components
var SelectedFeatureMenuItem = require('./selectedFeatureMenuItem');

var SelectedFeatureMenu = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
  },

  makeSelectedFeatureItems: function () {
    return this.props.features.map(function (feature, idx) {
      return (<SelectedFeatureMenuItem key={idx} feature={feature} />);
    });
  },

  render: function () {
    return (
      <div>
        {this.makeSelectedFeatureItems()}
      </div>
    );
  },

});

module.exports = SelectedFeatureMenu;

