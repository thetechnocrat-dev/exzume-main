var React = require('react');

// Components
var ProfilePanel = require('./profilePanel');
var ZumePanel = require('./zumePanel');

var Dashboard = React.createClass({

  render: function () {

    return (
      <div className="ui container">
        <ProfilePanel />
        <ZumePanel />
      </div>
    );
  },
});

module.exports = Dashboard;
