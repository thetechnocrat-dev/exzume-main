var React = require('react');
var Style = require('../../util/style');
var moment = require('moment');

// Components
var HorzBarViz = require('./horzBarViz.js');

var FitbitCard = React.createClass({
  propTypes: {
    fitbit: React.PropTypes.object.isRequired,
  },

  render: function () {
    var fitbit = this.props.fitbit;
    var streamName = fitbit.name;
    var lastSyncTime = moment(this.props.fitbit.lastSyncTime).fromNow();
    var calcAvg = function (featureDataArray) {
      var sum = 0;
      for (var i = 0; i < featureDataArray.length; i++) {
        sum += featureDataArray[i].value;
      }

      return sum / featureDataArray.length;
    };

    var findFeatureIndex = function (features, featureName) {
      for (var i = 0; i < features.length; i++) {
        if (features[i].name === featureName) {
          return i;
        }
      }

      return null;
    };

    var hoursAsleepIdx = findFeatureIndex(fitbit.features, 'Hours Asleep');
    var hoursAsleepLength = fitbit.features[hoursAsleepIdx].data.length;
    var avgHoursAsleep = parseFloat(
      calcAvg(fitbit.features[hoursAsleepIdx].data).toFixed(1)
    );
    var currentHoursAsleep = parseFloat(
      fitbit.features[hoursAsleepIdx].data[hoursAsleepLength - 1].value.toFixed(1)
    );

    var awakeningsIdx = findFeatureIndex(fitbit.features, '# of Awakenings');
    var awakeningsLength = fitbit.features[awakeningsIdx].data.length;
    var avgAwakenings = parseFloat(
      calcAvg(fitbit.features[awakeningsIdx].data).toFixed(0)
    );
    var currentAwakenings = parseFloat(
      fitbit.features[awakeningsIdx].data[awakeningsLength - 1].value.toFixed(0)
    );

    var stepsIdx = findFeatureIndex(fitbit.features, 'Steps');
    var stepsLength = fitbit.features[stepsIdx].data.length;
    var avgSteps = parseFloat(
      calcAvg(fitbit.features[stepsIdx].data).toFixed(0)
    );
    var currentSteps = parseFloat(
      fitbit.features[stepsIdx].data[stepsLength - 1].value.toFixed(0)
    );

    var veryActiveMinutesIdx = findFeatureIndex(fitbit.features, 'Very Active Minutes');
    var veryActiveMinutesLength = fitbit.features[veryActiveMinutesIdx].data.length;
    var avgVeryActiveMinutes = parseFloat(
      calcAvg(fitbit.features[veryActiveMinutesIdx].data).toFixed(0)
    );
    var currentVeryActiveMinutes = parseFloat(
      fitbit.features[veryActiveMinutesIdx].data[veryActiveMinutesLength - 1].value.toFixed(0)
    );

    var floorsIdx = findFeatureIndex(fitbit.features, 'Floors');
    var floorsLength = fitbit.features[floorsIdx].data.length;
    var avgFloors = parseFloat(
      calcAvg(fitbit.features[floorsIdx].data).toFixed(0)
    );
    var currentFloors = parseFloat(
      fitbit.features[floorsIdx].data[floorsLength - 1].value.toFixed(0)
    );

    var headerStyle = { margin: '2% 0% 2% 0%' };

    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header" style={headerStyle}>
            Sleep
          </div>
          <HorzBarViz
            label={'hours asleep'}
            avg={avgHoursAsleep}
            current={currentHoursAsleep}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
            featureName={'Hours Asleep'}
            streamName={streamName}
          />
          <HorzBarViz
            label={'awakenings'}
            avg={avgAwakenings}
            current={currentAwakenings}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
            featureName={'# of Awakenings'}
            streamName={streamName}
          />
          <div className="ui divider" />
          <div className="header" style={headerStyle}>
            Fitness
          </div>
          <HorzBarViz
            label={'steps'}
            avg={avgSteps}
            current={currentSteps}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
            featureName={'Steps'}
            streamName={streamName}
          />
          <HorzBarViz
            label={'very active minutes'}
            avg={avgVeryActiveMinutes}
            current={currentVeryActiveMinutes}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
            featureName={'Very Active Minutes'}
            streamName={streamName}
          />
          <HorzBarViz
            label={'floors'}
            avg={avgFloors}
            current={currentFloors}
            fillColor={Style.green}
            backgroundColor={Style.lightGreen}
            featureName={'Floors'}
            streamName={streamName}
          />
        </div>
        <div className="extra content">
          <div className="left floated time">
            last synced: {lastSyncTime}
          </div>
          <div className="right floated author">
            <i className="exchange icon"></i>
            Fitbit
          </div>
        </div>
      </div>
    );
  },
});

module.exports = FitbitCard;
