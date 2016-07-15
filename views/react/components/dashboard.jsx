var React = require('react');

// Components
var Navbar = require('./navbar');
var ProfilePanel = require('./dashboard/profilePanel');

var Dashboard = React.createClass({

  render: function () {

    return (
      <div className="ui container">
        <Navbar />
        <ProfilePanel />
        <
        {this.props.children}

      </div>
    );
  },
});

module.exports = Dashboard;
