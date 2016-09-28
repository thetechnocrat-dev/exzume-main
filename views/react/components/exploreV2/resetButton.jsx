var React = require('react');

ResetButton = React.createClass({
  render: function () {
    return (
      <button className="ui circular icon button">
        <i className="icon settings" />
      </button>
    );
  },

});

module.exports = ResetButton;

