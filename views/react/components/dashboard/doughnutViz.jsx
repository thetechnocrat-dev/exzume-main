var React = require('react');
var Chart = require('chart.js');
Chart.defaults.global.responsive = true;
var DoughnutChart = require('react-chartjs').Doughnut;

var DoughnutViz = React.createClass({
  propTypes: {
    average: React.PropTypes.number.isRequired,
    current: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
  },

  render: function () {
    var chartOptions = {

    };

    var thisAverage = 0;
    var thisCurrent = 0;

    if (this.props.current > this.props.average) {
      thisCurrent = this.props.average;
      thisAverage = 0;
    } else {
      thisCurrent = this.props.current;
      thisAverage = this.props.average - thisCurrent;
    }

    var chartData = [
      {
        color: '#000',
        label: 'current',
        value: thisCurrent,
        borderWidth: 2,
      }, {
        color: '#E8E8EE',
        label: 'till average',
        value: thisAverage,
        borderWidth: 1,
      },
    ];

    return (
      <div className="ui card">
        <div className="content">
          <div className="header" style={{ marginBottom: '3%' }}>
            {this.props.label}
          </div>
          <DoughnutChart data={chartData} options={chartOptions}/>
        </div>
      </div>
    );
  },

});

module.exports = DoughnutViz;
