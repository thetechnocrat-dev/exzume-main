var React = require('react');

// components
var DataVisualizationItem = require('./dataVisualizationItem');

var DataVisualizationIndex = React.createClass({

  render: function () {
    return (
      <div className="ui centered grid">
        <div className="doubling two column row">
            <DataVisualizationItem image="http://nvd3.org/examples/img/horizontalbar.png" />
            <DataVisualizationItem image="http://nvd3.org/examples/img/line.png" />
            <DataVisualizationItem image="http://nvd3.org/examples/img/scatter.png" />
            <DataVisualizationItem image="http://nvd3.org/examples/img/stackedbar.png" />
        </div>
      </div>
    );
  },

});

module.exports = DataVisualizationIndex;
