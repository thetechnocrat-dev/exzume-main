var React = require('react');
var History = require('react-router').History;

var leftNavbarButton = React.createClass({
  mixins: [History],

  propTypes: {
    label: React.PropTypes.string.isRequired,
    navigation: React.PropTypes.string.isRequired
  },

  clickItem: function () {
    this.history.push(this.props.navigation);
  },

  makeButtons: function () {
    if (window.location.hash.slice(12).startsWith(this.props.browserLoc)) {
      return (
        <a className="active item" onClick={this.clickItem}>{this.props.label}</a>
      );
    } else {
      return (
        <a className="item" onClick={this.clickItem}>{this.props.label}</a>
      );
    }
  },

  render: function () {
    return (
      <div>
        {this.makeButtons()}
      </div>
    );
  },

});

module.exports = leftNavbarButton;
