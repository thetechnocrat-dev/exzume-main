var React = require('react');

// components
var DataStreamItem = require('./dataStreamItem');

var DataStreamIndex = React.createClass({

  fitbitError: function () {
    console.log('fitbit error');
  },

  fitbitSuccess: function () {

  },

  render: function () {
    return (
      <div className="ui center aligned grid container">
        <div className="row">
          <h1 className="ui center aligned header">Your Data Streams</h1>
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
    );
  },

});

module.exports = DataStreamIndex;
