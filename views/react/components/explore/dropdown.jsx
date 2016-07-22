var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var GraphStore = require('../../stores/graphStore');

// Components
var DropdownItem = require('./dropdownItem');

var Dropdown = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getUserFeatures: function () {
    var datastreams = this.props.user.datastreams;
    var userFeatureList = [];
    var arr = [];

    for (datastream in datastreams) {
      if (datastreams[datastream].features.length != 0) {
        arr = datastreams[datastream].features.filter(function (feature) {
          return feature.data.length > 0;
        });

        for (a in arr) {
          userFeatureList.push(arr[a]);
        }
      }
    }

    return userFeatureList;
  },

  makeDropdownItems: function () {
    var userFeatures = this.getUserFeatures();
    return userFeatures.map(function (userFeature, idx) {
      console.log(userFeature);
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
