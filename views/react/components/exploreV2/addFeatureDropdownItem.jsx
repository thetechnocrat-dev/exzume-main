var React = require('react');

// Components
var AddFeatureDropdownFeatureItem = require('./addFeatureDropdownFeatureItem');

var DropdownItem = React.createClass({
  propTypes: {
    dataStream: React.PropTypes.object.isRequired,
  },

  makeFeatureItems: function () {
    return this.props.dataStream.features.map(function (feature, idx) {
      return (
        <AddFeatureDropdownFeatureItem key={idx} feature={feature} />
      );
    });
  },

  render: function () {
    return (
      <div className="item">
        <i className="dropdown icon" />
        {this.props.dataStream.name}
        <div className="menu">
          {this.makeFeatureItems()}
        </div>
      </div>
    );
  },

});

module.exports = DropdownItem;

