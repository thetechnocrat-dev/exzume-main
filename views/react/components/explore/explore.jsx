var React = require('react');
var PropTypes = React.PropTypes;

// Components
var Dropdown = require('./dropdown');

var Explore = React.createClass({

  render: function() {
    return (
      <div>
        <Dropdown />
      </div>
    );
  }

});

module.exports = Explore;
