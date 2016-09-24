var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');

var DropdownItem = React.createClass({
  propTypes: {
    userFeature: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { isSelected: false };
  },

  clickItem: function () {
    if (this.state.isSelected) {
      FastFlux.cycle('FEATURE_REMOVED', this.props.userFeature);
    } else {
      FastFlux.cycle('FEATURE_RECEIVED', this.props.userFeature);
    }

    this.setState({ isSelected: !this.state.isSelected });
  },

  makeItem: function () {
    if (this.state.isSelected) {
      console.log('isSelected');
      return (
        <div
          className="item"
          onClick={this.clickItem}
        >
          <div className="ui green empty circular label"></div>
          {this.props.userFeature.name}
        </div>
      );
    } else {
      return (
        <div
          className="item"
          onClick={this.clickItem}
        >
          {this.props.userFeature.name}
        </div>
      );
    }
  },

  render: function () {
    return this.makeItem();
  },

});

module.exports = DropdownItem;

