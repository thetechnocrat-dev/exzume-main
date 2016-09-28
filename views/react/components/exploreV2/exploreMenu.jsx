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
    isDisabled: React.PropTypes.bool.isRequired,
  },

  render: function () {
    return (
      <div className="ui top attached menu" style={{ backgroundColor: 'white' }}>
        <div className="item">
          <AddFeatureDropdown features={this.props.features} isDisabled={this.props.isDisabled} />
        </div>
        <div className="item">
          <TimeDropdown isDisabled={this.props.isDisabled} />
        </div>
        <div className="item">
          <NormalizeButton isDisabled={this.props.isDisabled} />
        </div>
        <div className="item">
          <CorrelateDropdown isDisabled={this.props.isDisabled} />
        </div>
      </div>
    );
  },

});

module.exports = ExploreMenu;

