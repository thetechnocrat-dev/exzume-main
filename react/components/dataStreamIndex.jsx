var React = require('react');

// components
var DataStreamItem = require('./DataStreamItem');

var DataStreamIndex = React.createClass({

  render: function () {
    return (
      <div className='ui grid'>
        <h1 className="ui header">Your Data Streams</h1>
        <div className="doubling eight column row">
          <DataStreamItem icon="browser" />
          <DataStreamItem icon="facebook" />
          <DataStreamItem icon="spotify" />
          <DataStreamItem icon="reddit" />
          <DataStreamItem icon="twitter" />
          <DataStreamItem icon="pied piper" />
          <DataStreamItem icon="github" />
          <DataStreamItem icon="plus" />
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
