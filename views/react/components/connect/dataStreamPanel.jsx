var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var allDataStreams = require('./allDataStreams');

// components
var AddDataStreamItem = require('./addDataStreamItem');

var DataStream = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
  },

  getUsersDataStreams: function () {
    var user = this.props.user;
    var userDataStreams = [];
    if (user.datastreams.survey.isConnected) userDataStreams.push('exzume');
    if (user.datastreams.fitbit.isConnected) userDataStreams.push('fitbit');
    if (user.datastreams.lastfm.isConnected) userDataStreams.push('lastfm');

    return userDataStreams;
  },

  makeUsersDataStreams: function () {
    var userDataStreams = this.getUsersDataStreams();
    return userDataStreams.map(function (dataStream, idx) {
      return <p key={idx}>{dataStream}</p>;
    });
  },

  makeAddDataStreams: function () {
    var userDataStreams = this.getUsersDataStreams();
    return allDataStreams.map(function (dataStream, idx) {
      if (!userDataStreams.includes(dataStream)) {
        return <AddDataStreamItem key={idx} dataStream={dataStream} />;
      }
    });
  },

  render: function () {

    return (
      <div>
        <h3 className="ui header">Your Data Streams</h3>
        {this.makeUsersDataStreams()}
        <h3 className="ui header">Add a Data Stream</h3>
        {this.makeAddDataStreams()}
      </div>
    );
  },

});

module.exports = DataStream;
