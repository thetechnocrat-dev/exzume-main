var React = require('react');

var NavBarExtender = React.createClass({

  render: function () {
    var style = {
      zIndex: '0',
    };

    return (
      <div className="ui top inversed inverted fixed menu" style={  style } />
    );
  },

});

module.exports = NavBarExtender;
