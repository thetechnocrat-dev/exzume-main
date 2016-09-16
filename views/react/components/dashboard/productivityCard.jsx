var React = require('react');
var Style = require('../../util/style');

// Components
var DoughnutViz = require('./doughnutViz');

var ProductivityCard = React.createClass({
  propTypes: {
    currentProductiveTime: React.PropTypes.number.isRequired,
    currentDistractingTime: React.PropTypes.number.isRequired,
    currentNeautralTime: React.PropTypes.number.isRequired,
    avgProductiveTime: React.PropTypes.number.isRequired,
    avgDistractingTime: React.PropTypes.number.isRequired,
    avgNeautralTime: React.PropTypes.number.isRequired,
  },

  componentDidMount: function () {
    console.log('prod card');
    console.log(this.props);
  },

  render: function () {
    var chartDataCurrent = [
      {
        color: Style.green,
        label: 'productive hours',
        value: this.props.currentProductiveTime,
      }, {
        color: Style.red,
        label: 'distracting hours',
        value: this.props.currentDistractingTime,
      }, {
        color: Style.gray,
        label: 'neautral hours',
        value: this.props.currentNeautralTime,
      },
    ];

    var chartDataAvg = [
      {
        color: Style.green,
        label: 'productive hours',
        value: this.props.avgProductiveTime,
      }, {
        color: Style.red,
        label: 'distracting hours',
        value: this.props.avgDistractingTime,
      }, {
        color: Style.gray,
        label: 'neautral hours',
        value: this.props.avgNeautralTime,
      },
    ];

    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Productivity
          </div>
            <DoughnutViz label={'today'} chartData={chartDataCurrent} />
            <DoughnutViz label={'average'} chartData={chartDataAvg} />
        </div>
      </div>
    );
  },

});

module.exports = ProductivityCard;

