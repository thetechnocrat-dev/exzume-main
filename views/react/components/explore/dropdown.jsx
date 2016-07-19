var React = require('react');
var PropTypes = React.PropTypes;

// Components
var Option = require('./option');
var Dropdown = React.createClass({

  render: function () {
    return (
      <div class="ui compact menu">
        <div class="ui simple dropdown item">
          Feature 1
          <i class="dropdown icon"></i>
          <div class="menu">
            <Option />
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Dropdown;
