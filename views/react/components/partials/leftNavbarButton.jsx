var React = require('react');
var History = require('react-router').History;

var leftNavbarButton = React.createClass({
  mixins: [History],

  propTypes: {
    label: React.PropTypes.string.isRequired,
    navigation: React.PropTypes.string.isRequired,
  },

  clickItem: function () {
    this.history.push(this.props.navigation);
  },

  render: function () {
    return (
      <a className="item" onClick={this.clickItem}>{this.props.label}</a>
    );
  },

});

module.exports = leftNavbarButton;
