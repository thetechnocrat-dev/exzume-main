var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// Components
var TimeMenuItem = require('./timeMenuItem');

var TimeMenu = React.createClass({
  propsTypes: {
    isDisabled: React.PropTypes.bool.isRequired,
  },

  getInitialState: function () {
    return { selectedLabel: 'Month', labels: ['Week', 'Month', 'Max'] };
  },

  clickItem: function (itemLabel) {
    FastFlux.cycle('FILTER_RECEIVED', { key: 'dateBound', value: itemLabel });
    this.setState({ selectedLabel: itemLabel });
  },

  isActive: function (label) {
    return label === this.state.selectedLabel;
  },

  makeMenuItems: function () {
    var _this = this;
    return this.state.labels.map(function (label, idx) {
      return (
        <TimeMenuItem
          key={idx}
          clickItem={_this.clickItem}
          isDisabled={_this.props.isDisabled}
          isActive={_this.isActive(label)}
          label={label}
        />
      );
    });
  },

  render: function () {
    return (
      <div className="ui secondary three item menu">
        {this.makeMenuItems()}
      </div>
    );
  },

});

module.exports = TimeMenu;

