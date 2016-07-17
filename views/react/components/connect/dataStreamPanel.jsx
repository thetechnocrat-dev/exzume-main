var React = require('react');
var SessionStore = require('../../stores/SessionStore');
var allDataStreams = require('./AllDataStreams');

var DataStream = React.createClass({
  getInitialState: function () {
    // if statement is for incase there is a refresh and page needs a second to get session
    if (SessionStore.currentUser()) {
      return { userDataStreams: this.getUsersDataStreams() };
    } else {
      return { userDataStreams: [] };
    }
  },

  getUsersDataStreams: function () {
    var user = SessionStore.currentUser();
    var userDataStreams = [];
    if (user.survey) userDataStreams.push('exzume');
    if (user.fitbit) userDataStreams.push('fitbit');
    if (user.lastfm) userDataStreams.push('lastfm');

    return userDataStreams;
  },

  _onChange: function () {
    this.setState({ userDataStreams: this.getUsersDataStreams() });
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  makeUsersDataStreams: function () {
    return this.state.userDataStreams.map(function (dataStream, idx) {
      return <p key={idx}>{dataStream}</p>;
    });
  },

  makeAddDataStreams: function () {
    var _this = this;
    return allDataStreams.map(function (dataStream, idx) {
      if (!_this.state.userDataStreams.includes(dataStream)) {
        return <p key={idx}>{dataStream}</p>;
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
