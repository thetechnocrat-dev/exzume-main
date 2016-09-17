var React = require('react');
var Chart = require('chart.js');
Chart.defaults.global.responsive = true;
var DoughnutChart = require('react-chartjs').Doughnut;

var DoughnutViz = React.createClass({
  propTypes: {
    chartData: React.PropTypes.array.isRequired,
    label: React.PropTypes.string.isRequired,
  },

  componentDidMount: function () {
    console.log('doughnut viz');
    console.log(this.props);
  },

  render: function () {
    chartOptions = {};

    return (
      <div>
        <DoughnutChart data={this.props.chartData} options={chartOptions}/>
        <br />
        {this.props.label}
      </div>
    );
  },

});

module.exports = DoughnutViz;

