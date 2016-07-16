var React = require('react');
// var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

// Components
var DataStreamItem = require('./dataStreamItem');

var DataStreamIndex = React.createClass({

  getInitialState: function () {
    if (SessionStore.isSignedIn()) {
      return { user: SessionStore.currentUser() };
    } else {
      return { user: { local: { username: '' } } };
    }
  },

  _onChange: function () {
    if (SessionStore.isSignedIn()) {
      this.setState({ user: SessionStore.currentUser() });
    } else {
      this.history.push('/');
    }
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  makeDataStreamItems: function () {
    var streams = [];
    if (this.state.user.fitbit) {
      streams.push({
        streamName: 'fitbit',
        streamImage: '/images/fitbit.png',
        streamDataURL: '/auth/datastreams/fitbit/grab',
      });
    };

    return streams.map(function (stream) {
      return (
        <DataStreamItem
          streamName={stream.streamName}
          streamImage={stream.streamImage}
          streamDataURL={stream.streamDataURL}
        />
      );
    });

  },

  render: function () {

    return (
      <div className="twelve wide column">
        <div className="ui center aligned text container">
          <h1 className="ui header">Your Data Streams</h1>
          <p className="ui header">Click an icon to sync again.</p>
          <i className="big refresh icon"></i>
          <div className="row">
            {this.makeDataStreamItems()}
          </div>
          <div className="row">
            <div className="ui simple dropdown">
              <button className="ui green icon button">
                <i className="big plus white icon"></i>
              </button>
              <div className="menu">
                <a className="item" href='/auth/datastreams/fitbit'>Fitbit</a>
                <a className="item" href='/auth/datastreams/lastfm'>LastFM</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
