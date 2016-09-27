var React = require('react');

// Components
var AddFeatureDropdownItem = require('./addFeatureDropdownItem');

var Dropdown = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
  },

  makeDropdownItems: function () {
    var _this = this;
    return this.props.features.map(function (feature, idx) {
      return (
        <AddFeatureDropdownItem
          key={idx}
          feature={feature}
        />
      );
    });
  },

  render: function () {
    return (
      <div className="ui compact menu">
        <div className="ui simple dropdown item">
          Compare 
          <i className="plus icon"></i>
          <div className="menu">
            {this.makeDropdownItems()}
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Dropdown;

