var React = require('react');
var PropTypes = React.PropTypes;

// Components
var ProfileCard = require('./profileCard');
var DataStreamIndex = require('./DataStreamIndex');

var ProfilePanel = React.createClass({

  render: function () {
    var profilePadding = { paddingTop: '7%' };

    return (
      <div className="ui stackable grid container" style={profilePadding}>
        <div className="row">
          <ProfileCard />
          <DataStreamIndex />
        </div>
      </div>
    );
  },

});

module.exports = ProfilePanel;
