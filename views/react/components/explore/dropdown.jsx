var React = require('react');

// Components
var DropdownItem = require('./dropdownItem');
var DropdownCorrItem = require('./dropdownCorrItem');

var Dropdown = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    features: React.PropTypes.array.isRequired,
  },

  makeDropdownItems: function () {
    var _this = this;
    return this.props.features.map(function (userFeature, idx) {
      if (_this.props.label === 'Plot Features') {
        return (
          <DropdownItem
            key={idx}
            userFeature={userFeature}
          />
        );
      } else if (_this.props.label === 'Find Top Correlators of a Feature') {
        return (
          <DropdownCorrItem
            key={idx}
            userFeature={userFeature}
          />
        );
      }
    });
  },

  render: function () {
    return (
      <div className="ui compact menu">
        <div className="ui simple dropdown item">
          {this.props.label}
          <i className="dropdown icon"></i>
          <div className="menu">
            {this.makeDropdownItems()}
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Dropdown;
