var React = require('react');

// Components
var DropdownItem = require('./dropdownItem');

var Dropdown = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
  },

  makeDropdownItems: function () {
    return this.props.features.map(function (userFeature, idx) {
      return (
          <DropdownItem
            key={idx}
            userFeature={userFeature}
          />
        );
    });
  },

  render: function () {
    return (
      <div className="ui compact menu">
        <div className="ui simple dropdown item">
          Select Feature 
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
