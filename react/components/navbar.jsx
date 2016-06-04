var React = require('react');

var Navbar = React.createClass({

  render: function () {
    return (
      <div className="ui three item menu">
        <a className="active item">Editorials</a>
        <a className="item">Reviews</a>
        <a className="item">Upcoming Events</a>
      </div>
    );
  },

});

module.exports = Navbar;
