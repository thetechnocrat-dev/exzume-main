var React = require('react');
var Style = require('../../util/style');
var moment = require('moment');
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
    var lastSyncTime = this.props.rescuetime.lastSyncTime;
    var dataLength = rescuetime.features[0].data.length;
    var dateToday = moment().format('YYYY-MM-DD');
    var currentProductiveTime;
    var currentNeutralTime;
    var currentDistractingTime;

    if (dateToday == rescuetime.features[0].data[dataLength - 1].dateTime) {
      currentProductiveTime = rescuetime.features[0].data[dataLength - 1].value;
      currentNeutralTime = rescuetime.features[1].data[dataLength - 1].value;
      currentDistractingTime = rescuetime.features[2].data[dataLength - 1].value;
    } else {
      currentProductiveTime = 0;
      currentNeutralTime = 0;
      currentDistractingTime = 0;
    };

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
          <DoughnutViz chartData={currentChartData} />
        </div>
        <div className="extra content">
          <div className="left floated time">
            last synced: {lastSyncTime}
          </div>
          <div className="right floated author">
            <i className="exchange icon"></i>
            RescueTime
          </div>
        </div>
      </div>
    );
  },

});

module.exports = RescueTimeCard;
