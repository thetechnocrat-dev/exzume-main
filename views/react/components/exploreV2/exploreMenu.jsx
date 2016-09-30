var React = require('react');
var Style = require('../../util/style');

// Components
var AddFeatureDropdown = require('./addFeatureDropdown');
var TimeDropdown = require('./timeDropdown');
var NormalizeButton = require('./normalizeButton');
var CorrelateDropdown = require('./correlateDropdown');
var ResetButton = require('./resetButton');

var ExploreMenu = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
    currentGraphDisplay: React.PropTypes.string.isRequired,
    isDisabled: React.PropTypes.bool.isRequired,
    currentFeatureName: React.PropTypes.string.isRequired,
    dataStreams: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div className="ui top attached menu" style={{ backgroundColor: 'white' }}>
        <div className="item">
          <AddFeatureDropdown
            dataStreams={this.props.dataStreams}
            isDisabled={
              this.props.isDisabled || this.props.currentGraphDisplay == 'correlateScatter'
            }
          />
        </div>
        <div className="item">
          <TimeDropdown isDisabled={this.props.isDisabled} />
        </div>
        <div className="item">
          <NormalizeButton
            isDisabled={
              this.props.isDisabled || this.props.currentGraphDisplay == 'correlateScatter'
            }
            />
        </div>
        <div className="item">
          <CorrelateDropdown
            dataStreams={this.props.dataStreams}
            isDisabled={this.props.isDisabled}
            currentFeatureName={this.props.currentFeatureName}
            features={this.props.features}
          />
        </div>
      </div>
    );
  },

});

module.exports = ExploreMenu;

