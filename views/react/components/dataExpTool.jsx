  var React = require('react');
  var rd3 = require('rd3');
  var PropTypes = React.PropTypes;

  var LineChart = rd3.LineChart;
  var DataStore = require('../stores/dataStore');

  var DataExpTool = React.createClass({

    render: function() {
        return  (
        	<LineChart
            legend={true}
            data={DataStore.getData()}
            width='100%'
            height={400}
            viewBoxObject={{
              x: 0,
              y: 0,
              width: 500,
              height: 400
            }}
            yAxisLabel="Altitude"
            xAxisLabel="Date"
            domain={{x: [,6], y: [-10,]}}
            gridHorizontal={true}
          />
      )}

  });

  module.exports = DataExpTool;
