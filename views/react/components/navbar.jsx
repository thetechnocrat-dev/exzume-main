var React = require('react');
var History = require('react-router').History;

var Navbar = React.createClass({
  mixins: [History],

  clickLogo: function () {
    this.history.push('/');
  },

  clickSignout: function () {
    // later this should actually sign the user out
    this.history.push('/');
  },

  render: function () {
    var menuItemStyle = { cursor: 'pointer' };

    return (
      <div className="ui inverted menu">
        <div className="item" style={menuItemStyle} onClick={this.clickLogo}>Exzume</div>
        <div className="right menu" style={menuItemStyle}>
          <div className="ui simple dropdown item">
            User42
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item">Settings</div>
              <div className="item" onClick={this.clickSignout}>Signout</div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Navbar;
