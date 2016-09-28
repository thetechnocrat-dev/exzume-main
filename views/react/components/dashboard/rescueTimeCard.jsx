var React = require('react');
var Style = require('../../util/style');
var Recharts = require('recharts');
const { PieChart, Pie, Sector } = Recharts;

// Components
var DoughnutViz = require('./doughnutViz');

var RescueTimeCard = React.createClass({
  propTypes: {
    rescuetime: React.PropTypes.object.isRequired,
  },

  componentDidMount: function () {
    console.log('prod card');
    console.log(this.props);
  },

  render: function () {
    var rescuetime = this.props.rescuetime;
    console.log(rescuetime.features);
    var dataLength = rescuetime.features[0].data[0].length;
    var currentProductiveTime = rescuetime.features[0].data[dataLength - 1].value;
    var currentNeutralTime = rescuetime.features[1].data[dataLength - 1].value;
    var currentDistractingTime = rescuetime.features[2].data[dataLength - 1].value;
    var currentChartData = [{ name: 'productive time', value: currentProductiveTime },
                            { name: 'neutral time', value: currentNeutralTime },
                            { name: 'distracting time', value: currentDistractingTime },];

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
          <div className="header">
            Productivity
          </div>
          <DoughnutViz chartData={currentChartData}/>
        </div>
      </div>
    );
  },

});

module.exports = RescueTimeCard;
