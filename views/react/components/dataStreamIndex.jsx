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
      <div className='ui left aligned grid'>
        <div className="doubling eight column row">
          <div className="column">
            <div className="ui simple dropdown">
              <button className="ui green icon button">
                <i className="large plus white icon"></i>
              </button>
              <div className="menu">
                <a className="item" href='/auth/datastreams/fitbit'>Fitbit</a>
                <a className="item" href='/auth/datastreams/lastfm'>LastFM</a>
              </div>
            </div>
          </div>
          <DataStreamItem icon="blue google" label="Google Form" />
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
