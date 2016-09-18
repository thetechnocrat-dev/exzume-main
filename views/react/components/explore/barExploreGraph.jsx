var React = require('react');
var GraphStore = require('../../stores/graphStore');
var d3 = require('d3');
var rd3 = require('rd3');
var BarChart = rd3.BarChart;

var BarExploreGraph = React.createClass({
  propTypes: {
    barData: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  render: function () {
    return (
      <BarChart
        data={this.props.barData}
        width={this.props.width}
        height={this.props.height}
        title="Bar Chart"
        xAxisLabel="Value"
        yAxisLabel="Label"
      />
    );
  },

});

module.exports = BarExploreGraph;

