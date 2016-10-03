var React = require('react');
var Style = require('../../util/style');
var moment = require('moment');
var Recharts = require('recharts');
const { PieChart, Pie, Sector } = Recharts;

// Components
var DoughnutViz = require('./doughnutViz');
var HorzBarViz = require('./horzBarViz');

var RescueTimeCard = React.createClass({
  propTypes: {
    rescuetime: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    // cardDiameter will update once component mounts
    return ({ cardDiameter: null });
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
    var rescuetime = this.props.rescuetime;
    var lastSyncTime = moment(this.props.rescuetime.lastSyncTime).fromNow();
    var dataLength = rescuetime.features[0].data.length;

    var currentProductiveTime = parseFloat(
      rescuetime.features[0].data[dataLength - 1].value.toFixed(2)
    );
    var currentNeutralTime = parseFloat(
      rescuetime.features[1].data[dataLength - 1].value.toFixed(2)
    );
    var currentDistractingTime = parseFloat(
      rescuetime.features[2].data[dataLength - 1].value.toFixed(2)
    );

    var currentChartData = [
      { name: 'productive time', value: currentProductiveTime },
      { name: 'neutral time', value: currentNeutralTime },
      { name: 'distracting time', value: currentDistractingTime },
    ];

    // get average times:
    var arr = [0, 0, 0];
    var avgArr = arr.map(function (avg, idx) {
      var sum = 0;
      for (var i = 0; i < dataLength; i++) {
        sum += rescuetime.features[idx].data[i].value;
      }

      avg = sum / dataLength;
      return avg;
    });

    var avgProductiveTime = parseFloat(avgArr[0].toFixed(2));
    var avgNeutralTime = parseFloat(avgArr[1].toFixed(2));
    var avgDistractingTime = parseFloat(avgArr[2].toFixed(2));

    return (
      <div className="ui fluid card" id="rescueTimeCard">
        <div className="content">
          <div className="header">
            Computer Productivity
          </div>
          <DoughnutViz
            chartData={currentChartData}
            chartDiameter={this.state.diameter}
          />
          <HorzBarViz
            label={'productive hours'}
            avg={avgProductiveTime}
            current={currentProductiveTime}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'distracting hours'}
            avg={avgDistractingTime}
            current={avgDistractingTime}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'neutral hours'}
            avg={avgNeutralTime}
            current={currentNeutralTime}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
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

