var React = require('react');

// Components
var DropdownCorrItem = require('./dropdownCorrItem');

var DropdownCorr = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    features: React.PropTypes.array.isRequired,
  },

  makeDropdownItems: function () {
    var _this = this;
    return this.props.features.map(function (userFeature, idx) {
      return (
        <DropdownCorrItem
          key={idx}
          userFeature={userFeature}
        />
      );
    });
  },

  render: function () {
    return (
      <div>
      <div className="ui loading selection dropdown">{this.props.label}</div>
      <div className="ui compact menu">
        <div className="ui simple dropdown item">
          {this.props.label}
          <i className="dropdown icon"></i>
          <div className="menu">
            {this.makeDropdownItems()}
          </div>
        </div>
      </div>
      </div>
    );
  },

});

module.exports = DropdownCorr;
