var React = require('react');

// Components
var Navbar = require('./navbar');

var App = React.createClass({

  render: function () {

    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  },
});

module.exports = App;
