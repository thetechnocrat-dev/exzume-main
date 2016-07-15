var React = require('react');

// Components
var Navbar = require('./partials/navbar');
var ProfilePanel = require('./dashboard/profilePanel');
var ZumePanel = require('./dashboard/zumePanel');
var Footer = require('./partials/footer');

var Dashboard = React.createClass({

  render: function () {

    return (
      <div className="ui container">
        <Navbar />

          <ProfilePanel />
          <ZumePanel />

        {this.props.children}
        <Footer />
      </div>
    );
  },
});

module.exports = Dashboard;
