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

    // get current times:
    // if (dateToday == rescuetime.features[0].data[dataLength - 1].dateTime) {
      currentProductiveTime = rescuetime.features[0].data[dataLength - 1].value.toFixed(2);
      currentNeutralTime = rescuetime.features[1].data[dataLength - 1].value.toFixed(2);
      currentDistractingTime = rescuetime.features[2].data[dataLength - 1].value.toFixed(2);
    // } else {
    //   currentProductiveTime = 0;
    //   currentNeutralTime = 0;
    //   currentDistractingTime = 0;
    // };
    console.log(currentProductiveTime);
    console.log(currentNeutralTime);
    console.log(currentDistractingTime);
    var currentChartData = [{ name: 'productive time', value: currentProductiveTime },
                            { name: 'neutral time', value: currentNeutralTime },
                            { name: 'distracting time', value: currentDistractingTime },];

    // get average times:
    var arr = [0, 0, 0];
    var avgArr = arr.map(function (avg, idx) {
      var sum = 0;
      for (var i = 0; i < dataLength; i++) {
        sum += rescuetime.features[idx].data[i].value;
      }

      avg = sum / dataLength;
      console.log(avg);
      return avg;
    });

    console.log(avgArr[0]);
    console.log(avgArr[1]);
    console.log(avgArr[2]);
    console.log(avgArr[0].toFixed(2));
    console.log(avgArr[1].toFixed(2));
    console.log(avgArr[2].toFixed(2));

    var averageChartData = [{ name: 'productive time', value: avgArr[0].toFixed(2) },
                            { name: 'neutral time', value: avgArr[1].toFixed(2) },
                            { name: 'distracting time', value: avgArr[2].toFixed(2) },];

    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header">
            Productivity
          </div>
          <h3 className="ui sub header">Today</h3>
          <DoughnutViz chartData={currentChartData} />
          <h3 className="ui sub header">Average</h3>
          <DoughnutViz chartData={averageChartData} />
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
