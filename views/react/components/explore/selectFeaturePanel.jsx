var React = require('react');
var GraphStore = require('../../stores/graphStore');
var SessionStore = require('../../stores/sessionStore');

// components
var Dropdown = require('./dropdown');

var SelectFeaturePanel = React.createClass({
  propTypes: {
    selectableFeatures: React.PropTypes.array.isRequired,
    selectedFeatures: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div>
        <Dropdown label="Plot Features" features={this.props.selectableFeatures} />
        <div style={{ width: '14px', display: 'inline-block' }} />
        <Dropdown
          label="Correlate Features"
          features={this.props.selectableFeatures}
          style={{ marginLeft: '14px' }}
        />
      </div>
    );
  },

});

module.exports = SelectFeaturePanel;
