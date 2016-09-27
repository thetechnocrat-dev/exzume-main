var React = require('react');

// Components
var SelectFeatureDropdownItem = require('./selectFeatureDropdownItem');

var SelectFeatureDropdown = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
  },

  componentDidMount: function () {
    $('#selectFeatureDropdown')
      .dropdown()
    ;
  },

  makeDropdownItems: function () {
    return this.props.features.map(function (feature, idx) {
      return (
        <SelectFeatureDropdownItem
          key={idx}
          feature={feature}
        />
      );
    });
  },

  render: function () {
    return (
      <div className="ui selection dropdown" id="selectFeatureDropdown">
        <input type="hidden" name="select a feature to explore" />
        <i className="dropdown icon" />
        <div className="default text">Select a Feature to Explore</div>
        <div className="menu">
          {this.makeDropdownItems()}
        </div>
      </div>
    );
  },

});

module.exports = SelectFeatureDropdown;

