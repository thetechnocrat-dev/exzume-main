var React = require('react');
var PropTypes = React.PropTypes;

// Components
var DropdownItem = require('./dropdownItem');

var Dropdown = React.createClass({

  getUserFeatures: function () {
    var datastreams = this.props.user.datastreams;
    var userFeatureList = [];
    var arr = [];

    for (datastream in datastreams) {
      if (datastreams[datastream].features.length != 0) {
        arr = datastreams[datastream].features.filter(function (feature) {
          return feature.dates.length > 0;
        });

        for (a in arr) {
          userFeatureList.push(arr[a]);
        }
      }
    }

    return userFeatureList;
  },

  makeDropdownItems: function () {
    var dropdownItems = this.getUserFeatures();
    return dropdownItems.map(function (dropdownItem, idx) {
      console.log(dropdownItem);
      return (
          <DropdownItem
            key={idx}
            name={dropdownItem.name}
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
