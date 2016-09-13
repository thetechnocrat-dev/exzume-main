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
        <Dropdown features={this.props.selectableFeatures} />
      </div>
    );
  },

});

module.exports = SelectFeaturePanel;
