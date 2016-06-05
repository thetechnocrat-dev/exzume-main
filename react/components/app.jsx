var React = require('react');

// Components
var Navbar = require('./navbar');
var NavbarHolder = require('./navbarHolder');

var App = React.createClass({

  render: function () {

    return (
      <div>
        <Navbar />
        <NavbarHolder />
        <div className="ui container">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = App;
