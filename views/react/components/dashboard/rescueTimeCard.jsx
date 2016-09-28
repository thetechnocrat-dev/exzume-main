var React = require('react');
var Style = require('../../util/style');
var Recharts = require('recharts');
const { PieChart, Pie, Sector } = Recharts;

// Components
var DoughnutViz = require('./doughnutViz');

var RescueTimeCard = React.createClass({
  propTypes: {
    rescuetime: React.PropTypes.object.isRequired,
    // currentProductiveTime: React.PropTypes.number.isRequired,
    // currentDistractingTime: React.PropTypes.number.isRequired,
    // currentNeutralTime: React.PropTypes.number.isRequired,
    // avgProductiveTime: React.PropTypes.number.isRequired,
    // avgDistractingTime: React.PropTypes.number.isRequired,
    // avgNeutralTime: React.PropTypes.number.isRequired,
  },

  componentDidMount: function () {
    console.log('prod card');
    console.log(this.props);
  },

  render: function () {
    var rescuetime = this.props.rescuetime;
    var data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
                { name: 'Group C', value: 300 },];

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
        label: 'neutral hours',
        value: this.props.currentNeutralTime,
      },
    ];

    // var chartDataAvg = [
    //   {
    //     color: Style.green,
    //     label: 'productive hours',
    //     value: this.props.avgProductiveTime,
    //   }, {
    //     color: Style.red,
    //     label: 'distracting hours',
    //     value: this.props.avgDistractingTime,
    //   }, {
    //     color: Style.gray,
    //     label: 'neutral hours',
    //     value: this.props.avgNeutralTime,
    //   },
    // ];
    /*{ <DoughnutViz label={'today'} chartData={chartDataCurrent} />
     <DoughnutViz label={'average'} chartData={chartDataAvg} /> }*/

    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Productivity
          </div>
            <DoughnutViz />

        </div>
      </div>
    );
  },

});

module.exports = RescueTimeCard;
