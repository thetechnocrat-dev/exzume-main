var React = require('react');
var PropTypes = React.PropTypes;

var DataStreamButton = React.createClass({
  propTypes: {
    dataStream: React.PropTypes.string.isRequired,
    isActive: React.PropTypes.bool,
  },

  makeButton: function () {
    if (this.props.isActive) {
      return (
        <button className="ui green labeled mini icon button">
          <i className="check icon"></i>
          {this.props.dataStream}
        </button>
      );
    } else {
      return (
        <button className="ui green labeled mini icon button">
          <i className="plus icon"></i>
          {this.props.dataStream}
        </button>
      );
    }

  },

  render: function () {
    return (
      this.makeButton()
    );
  },

});

module.exports = DataStreamButton;
