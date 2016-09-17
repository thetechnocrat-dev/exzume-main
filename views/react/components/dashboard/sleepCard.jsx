var React = require('react');
var Style = require('../../util/style');

// Components
var HorzBarViz = require('./horzBarViz');

var SleepCard = React.createClass({
  propTypes: {
    wakeUpTime: React.PropTypes.string.isRequired,
    avgWakeUpTime: React.PropTypes.string.isRequired,
    bedTime: React.PropTypes.string.isRequired,
    avgBedTime: React.PropTypes.number.isRequired,
    currentSleepEfficiency: React.PropTypes.number.isRequired,
    avgSleepEfficiency: React.PropTypes.number.isRequired,
    currentTimeToFallAsleep: React.PropTypes.number.isRequired,
    avgTimeToFallAsleep: React.PropTypes.number.isRequired,
    currentAwakenings: React.PropTypes.number.isRequired,
    avgAwakenings: React.PropTypes.number.isRequired,
    currentMinutesNapping: React.PropTypes.number.isRequired,
    avgMinutesNapping: React.PropTypes.number.isRequired,
  },

  render: function () {
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={{ marginBottom: '2%' }}>
            Sleep
          </div>
          <div className="ui two column grid">
            <div className="column" style={{ textAlign: 'center' }}>
              went to bed
              <br />
              {this.props.bedTime}
              <br />
              {this.props.avgBedTime + ' avg'}
            </div>
            <div className="column" style={{ textAlign: 'center' }}>
              woke up
              <br />
              {this.props.wakeUpTime}
              <br />
              {this.props.avgWakeUpTime + ' avg'}
            </div>
          </div>
          <HorzBarViz
            label={'sleep efficiency'}
            avg={this.props.avgSleepEfficiency}
            current={this.props.currentSleepEfficiency}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'minutes to fall asleep'}
            avg={this.props.avgTimeToFallAsleep}
            current={this.props.currentTimeToFallAsleep}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'awakenings'}
            avg={this.props.avgAwakenings}
            current={this.props.currentAwakenings}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
          <HorzBarViz
            label={'minutes napping'}
            avg={this.props.avgMinutesNapping}
            current={this.props.currentMinutesNapping}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
          />
        </div>
      </div>
    );
  },

});

module.exports = SleepCard;

