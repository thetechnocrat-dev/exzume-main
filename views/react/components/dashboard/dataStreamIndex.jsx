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

  getInitialState: function () {
    // render add data stream button if only manual survey is connected otherwise show streams
    if (this.props.userStreams.length == 1) {
      return { headerMessage: 'No devices or apps connected.' };
    } else {
      return { headerMessage: 'Click an icon to sync your data.' };
    }
  },

  clickConnect: function () {
    this.history.push('/dashboard/connect');
  },

  makeDataStreamItems: function () {
    var streams = [];
    if (this.props.user.datastreams.fitbit.isConnected) {
      streams.push({
        streamName: 'fitbit',
        streamImage: '/images/fitbit.png',
        streamDataURL: '/auth/datastreams/fitbit/grab',
      });
    }

    if (this.props.user.datastreams.lastfm.isConnected) {
      streams.push({
        streamName: 'lastfm',
        streamImage: '/images/last-fm.svg',
        streamDataURL: '/auth/datastreams/lastfm/grab',
      });
    }

    // render connect option if no connected data streams
    if (streams.length == 0) {
      return (
        <button className="ui yellow button" onClick={this.clickConnect}>
          Go Connect Devices
        </button>
      );
    } else {
      return streams.map(function (stream, idx) {
        return (
          <DataStreamItem
            key={idx}
            streamName={stream.streamName}
            streamImage={stream.streamImage}
            streamDataURL={stream.streamDataURL}
          />
        );
      });
    }
  },

  render: function () {

    return (
      <div className="twelve wide column">
        <div className="ui center aligned text container">
          <h1 className="ui header">Your Data Streams</h1>
          <p className="ui header">{this.state.headerMessage}</p>
          <div className="row">
            <div className="ui horizontal segments">
              {this.makeDataStreamItems()}
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
