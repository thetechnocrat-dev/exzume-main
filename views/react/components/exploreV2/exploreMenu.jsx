var React = require('react');

// Components
var AddFeatureDropdown = require('./addFeatureDropdown');
var TimeDropdown = require('./timeDropdown');

var ExploreMenu = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div className="ui top attached menu">
        <div className="item">
          <AddFeatureDropdown features={this.props.features} />
        </div>
        <div className="item">
          <TimeDropdown />
        </div>
      </div>
    );
  },

});

module.exports = ExploreMenu;

