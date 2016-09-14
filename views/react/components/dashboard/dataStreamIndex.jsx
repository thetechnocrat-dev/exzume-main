var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var History = require('react-router').History;

// Components
var DataStreamItem = require('./dataStreamItem');

var DataStreamIndex = React.createClass({
  mixins: [History],

  propTypes: {
    user: React.PropTypes.object.isRequired,
    userStreams: React.PropTypes.array.isRequired,
  },

  clickConnect: function () {
    this.history.push('/dashboard/connect');
  },

  makeDataStreamItems: function () {
    // render connect option if no connected data streams
    // default one data stream for built in manual data collector
    if (this.props.userStreams.length == 1) {
      return (
        <button className="ui yellow button" onClick={this.clickConnect}>
          Go Connect Devices
        </button>
      );
    } else {
      return this.props.userStreams.map(function (stream, idx) {
        if (stream.name !== 'Personal Survey') {
          return (
            <DataStreamItem
              key={idx}
              stream={stream}
            />
          );
        }
      });
    }
  },

  render: function () {

    return (
      <div className="twelve wide column">
        <div className="ui center aligned text container">
          <h1 className="ui header">Your Data Streams</h1>
          <div className="row">
            <div className="ui centered grid">
              {this.makeDataStreamItems()}
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
