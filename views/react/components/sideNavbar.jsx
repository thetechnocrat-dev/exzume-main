  var React = require('react');
  var PropTypes = React.PropTypes;

  var SideNavbar = React.createClass({

    render: function() {
      return (
        <div className="ui vertical inverted sidebar menu">
          <a className="active item">Home</a>
          <a className="item">About</a>
          <a className="item">Contact</a>
          <a className="item">Signin</a>
          <a className="item">Signup</a>
        </div>
      );
    }

  });

  module.exports = SideNavbar;
