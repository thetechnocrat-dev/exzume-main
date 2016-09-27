var React = require('react');

// Components
var DropdownItem = require('./dropdownItem');

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
    var _this = this;
    return this.props.features.map(function (feature, idx) {
      return (
        <DropdownItem
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

