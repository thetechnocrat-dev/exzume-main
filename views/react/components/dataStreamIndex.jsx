var React = require('react');

// components
var DataStreamItem = require('./dataStreamItem');

var DataStreamIndex = React.createClass({

  render: function () {
    return (
      <div className='ui center aligned grid'>
        <div className="doubling eight column row">
          <div className="column">
            <button className="ui icon button">
              <i className="large plus icon"></i>
            </button>
          </div>
          <DataStreamItem icon="browser" />
          <DataStreamItem icon="facebook" />
          <DataStreamItem icon="spotify" />
          <DataStreamItem icon="reddit" />
          <DataStreamItem icon="twitter" />
          <DataStreamItem icon="pied piper" />
          <DataStreamItem icon="github" />
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
