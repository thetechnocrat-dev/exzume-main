var React = require('react');

var SideNavbar = React.createClass({

  componentDidMount: function () {
    // $('.ui.sidebar').sidebar('attach events', '.toc.item');
  },

  clickTest: function () {
    // console.log($('.ui.sidebar').sidebar('is visible'));
  },

  render: function () {
    return (
      <div className="ui vertical inverted sidebar menu">
        <a className="active item">Home</a>
        <a className="item" onClick={this.clickTest}>About</a>
        <a className="item">Contact</a>
        <a className="item">Signin</a>
        <a className="item">Signup</a>
      </div>
    );
  },

});

module.exports = SideNavbar;
