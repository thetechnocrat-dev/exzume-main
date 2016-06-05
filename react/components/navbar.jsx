var React = require('react');

var Navbar = React.createClass({

  render: function () {
    return (
      <div className="ui top fixed inverted menu">
        <div className="item">Exzume</div>

        <div className="right menu">
          <div className="item">User42</div>
        </div>

      </div>
    );
  },

});

module.exports = Navbar;
