var React = require('react');

// Components
var ProfileCard = require('./profileCard');
var DataStreamIndex = require('./dataStreamIndex');

var ProfilePanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    userFeatures: React.PropTypes.array.isRequired,
    userStreams: React.PropTypes.array.isRequired,
  },

  render: function () {
    var profilePadding = { paddingTop: '7%' };

    return (
      <div className="ui stackable grid container" style={profilePadding}>
        <div className="row">
          <ProfileCard user={this.props.user} userFeatures={this.props.userFeatures} />
          <DataStreamIndex user={this.props.user} userStreams={this.props.userStreams} />
        </div>
      </div>
    );
  },

});

module.exports = ProfilePanel;

