var React = require('react');
var GraphStore = require('../../stores/graphStore');
var SessionStore = require('../../stores/sessionStore');

// components
var Dropdown = require('./dropdown');
var DropdownCorr = require('./dropdownCorr');

var SelectFeaturePanel = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div>
        <Dropdown
          label="Plot Features"
          features={this.props.features}
        />
        <div style={{ margin: '5px', display: 'inline-block' }}>OR</div>
        <DropdownCorr
          label="Find Top Correlators of a Feature"
          features={this.props.features}
          style={{ marginLeft: '14px' }}
        />
      </div>
    );
  },

});

module.exports = SelectFeaturePanel;

