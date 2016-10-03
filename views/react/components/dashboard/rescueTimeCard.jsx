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

  getInitialState: function () {
    return ({ cardWidth: null, cardHeight: null });
  },

  setDiameter: function () {
    var diameter = document.getElementById('rescueTimeCard').offsetWidth;
    this.setState({ diameter: diameter });
  },

  handleResize: function () {
    this.setDiameter();
  },

  componentDidMount: function () {
    this.setDiameter();
    window.addEventListener('resize', this.handleResize);
  },

  render: function () {
    console.log(this.props);
    var rescuetime = this.props.rescuetime;
    var lastSyncTime = this.props.rescuetime.lastSyncTime;
    var dataLength = rescuetime.features[0].data.length;
    var currentProductiveTime;
    var currentNeutralTime;
    var currentDistractingTime;

    currentProductiveTime = parseFloat(rescuetime.features[0].data[dataLength - 1].value.toFixed(2));
    currentNeutralTime = parseFloat(rescuetime.features[1].data[dataLength - 1].value.toFixed(2));
    currentDistractingTime = parseFloat(rescuetime.features[2].data[dataLength - 1].value.toFixed(2));

    // currentProductiveTime = 4.22;
    // currentNeutralTime = 0.45;
    // currentDistractingTime = 1.55;

    var currentChartData = [{ name: 'productive time', value: currentProductiveTime },
                            { name: 'neutral time', value: currentNeutralTime },
                            { name: 'distracting time', value: currentDistractingTime },];

    // get average times:
    // var arr = [0, 0, 0];
    // var avgArr = arr.map(function (avg, idx) {
    //   var sum = 0;
    //   for (var i = 0; i < dataLength; i++) {
    //     sum += rescuetime.features[idx].data[i].value;
    //   }

    //   avg = sum / dataLength;
    //   console.log(avg);
    //   return avg;
    // });

    // var averageChartData = [{ name: 'productive time', value: parseFloat(avgArr[0].toFixed(2)) },
    //                         { name: 'neutral time', value: parseFloat(avgArr[1].toFixed(2)) },
    //                         { name: 'distracting time', value: parseFloat(avgArr[2].toFixed(2)) },];

    return (
      <div className="ui fluid card" id="rescueTimeCard">
        <div className="content">
          <div className="header">
            Productivity
          </div>
            <h1 className="ui sub header">Today</h1>
            <DoughnutViz
              chartData={currentChartData}
              chartDiameter={this.state.diameter}
            />
            {/*<div className="column">
              <h1 className="ui sub header">Average</h1>
                <DoughnutViz
                  chartData={averageChartData}
                  cardDiameter={this.state.cardWidth}
                  cardHeight={this.state.cardHeight}
                />
            </div>*/}
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

