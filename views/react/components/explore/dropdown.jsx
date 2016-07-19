var React = require('react');
var PropTypes = React.PropTypes;

// Components
var DropdownItem = require('./dropdownItem');

var Dropdown = React.createClass({

  getUserFeatures: function () {
    var datastreams = this.props.user.datastreams;
    var userFeatureList = [];

    for (datastream in datastreams) {
      if (datastream.features) {
        userFeatureList = datastream.features.filter(function (feature) {
          return feature.dates.length > 0;
        });
      }
    }

    return userFeatureList;
  },

  makeDropdownItems: function () {
    var dropdownItems = this.getUserFeatures();
    console.log(dropdownItems);
    return dropdownItems.map(function (dropdownItem, idx) {
      return (
          <DropdownItem
            key={idx}
            featureName={dropdownItem.name}
            dates={dropdownItem.dates}
            data={dropdownItem.data}
          />
        );
    });
  },

  render: function () {
    return (
      <div className="ui compact menu">
        <div className="ui simple dropdown item">
          Feature 1
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
