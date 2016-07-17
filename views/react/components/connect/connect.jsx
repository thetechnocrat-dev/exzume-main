var React = require('react');

// Components
var FeaturePanel = require('./featurePanel');
var DataStreamPanel = require('./dataStreamPanel');

var Connect = React.createClass({

  render: function () {
    return (
      <div>
        <h2 className="ui header">Data Streams</h2>
        <DataStreamPanel />
        <h2 className="ui header">Track a Feature</h2>
        <FeaturePanel />
      </div>
    );
  },

});

module.exports = Connect;
