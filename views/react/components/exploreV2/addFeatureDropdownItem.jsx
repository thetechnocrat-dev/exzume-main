var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');

var DropdownItem = React.createClass({
  propTypes: {
    feature: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { isSelected: false };
  },

  clickItem: function () {
    if (this.state.isSelected) {
      FastFlux.cycle('TIME_SERIES_REMOVED', this.props.feature);
    } else {
      FastFlux.cycle('TIME_SERIES_RECEIVED', this.props.feature);
    }

    this.setState({ isSelected: !this.state.isSelected });
  },

  makeItem: function () {
    if (this.state.isSelected) {
      return (
        <div
          className="item"
          onClick={this.clickItem}
        >
          <div className="ui green empty circular label"></div>
          {this.props.feature.name}
        </div>
      );
    } else {
      return (
        <div
          className="item"
          onClick={this.clickItem}
        >
          {this.props.feature.name}
        </div>
      );
    }
  },

  render: function () {
    return this.makeItem();
  },

});

module.exports = DropdownItem;

