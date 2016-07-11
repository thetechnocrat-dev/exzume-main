var React = require('react');

// Components
var Navbar = require('./navbar');

var Dashboard = React.createClass({

  render: function () {

    return (
      <div className="ui container">
        <Navbar />
        {this.props.children}

      </div>
    );
  },
});

module.exports = Dashboard;
