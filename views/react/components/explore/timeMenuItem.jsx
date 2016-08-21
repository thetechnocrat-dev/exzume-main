var React = require('react');

var TimeMenuItem = React.createClass({
  propTypes: {
    clickItem: React.PropTypes.func.isRequired,
    isDisabled: React.PropTypes.bool.isRequired,
    isActive: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string.isRequired,
  },

  makeClassName: function () {
    if (this.props.isDisabled) {
      return 'disabled item';
    } else if (this.props.isActive) {
      return 'active item';
    } else {
      return 'item';
    }
  },

  clickItem: function () {
    if (!this.props.isDisabled) {
      this.props.clickItem(this.props.label);
    }
  },

  render: function () {
    var style = this.props.isDisabled ? {} : { cursor: 'pointer' };
    return (
      <div
        className={this.makeClassName()}
        onClick={this.clickItem}
        style = {style}
      >
        {this.props.label}
      </div>
    );
  },

});

module.exports = TimeMenuItem;

