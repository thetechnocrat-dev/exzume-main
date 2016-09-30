var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');

var DropdownItem = React.createClass({
  propTypes: {
    dataStream: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { isSelected: false };
  },

  clickItem: function (feature) {
    if (this.state.isSelected) {
      FastFlux.cycle('TIME_SERIES_REMOVED', feature);
    } else {
      FastFlux.cycle('TIME_SERIES_RECEIVED', feature);
    }

    this.setState({ isSelected: !this.state.isSelected });
  },

  makeFeatureItems: function () {
    var _this = this;
    return this.props.dataStream.features.map(function (feature, idx) {
      if (_this.state.isSelected) {
        return (
          <div
            key={idx}
            className="item"
            onClick={_this.clickItem.bind(null, feature)}
          >
            <div className="ui green empty circular label"></div>
            {feature.name}
          </div>
        );
      } else {
        return (
          <div
            key={idx}
            className="item"
            onClick={_this.clickItem.bind(null, feature)}
          >
            {feature.name}
          </div>
        );
      }
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

