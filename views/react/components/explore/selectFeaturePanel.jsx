var React = require('react');
var GraphStore = require('../../stores/graphStore');
var SessionStore = require('../../stores/sessionStore');

// components
var Dropdown = require('./dropdown');
var SelectedFeatureMenu = require('./selectedFeatureMenu');
var NormalizeButton = require('./normalizeButton');
var CorrelateButton = require('./correlateButton');

var SelectFeaturePanel = React.createClass({
  propTypes: {
    selectableFeatures: React.PropTypes.array.isRequired,
    selectedFeatures: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div>
        <Dropdown features={this.props.selectableFeatures} />
        <SelectedFeatureMenu features={this.props.selectedFeatures} />
        <div className="ui grid" style={{ marginTop: '0.5%' }}>
          <div className="row" style={{ marginLeft: '2%' }}>
            <NormalizeButton features={this.props.selectedFeatures} />
            <CorrelateButton />
          </div>
        </div>
      </div>
    );
  },

});

module.exports = SelectFeaturePanel;
