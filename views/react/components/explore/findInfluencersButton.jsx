var React = require('react');
var GraphStore = require('../../stores/graphStore');
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var moment = require('moment');

var FindInfluencersButton = React.createClass({
  propTypes: {
    feature: React.PropTypes.array.isRequired,
  },

  findTopInfluencers: function (corrArray) {
    // sorts correlations greatest to smallest by abs value
    var sortedCorrArray = corrArray.slice().sort(function (feature1, feature2) {
      if (Math.abs(feature1[1]) < Math.abs(feature2[1])) {
        return 1;
      } else if (Math.abs(feature1[1]) > Math.abs(feature2[1])) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortedCorrArray.slice(1, 6);
  },

  corrSuccess: function (res) {
    console.log('find influencers success------');
    var currentFeatureName = GraphStore.getSeriesData()[0].name;
    var featureNames = Object.keys(res);
    var corrData = res[currentFeatureName];
    var labeledCorrData = featureNames.map(function (featureName, idx) {
      return [featureName, corrData[idx]];
    });

    var topInfluencers = this.findTopInfluencers(labeledCorrData);

    var barData = {};
    var values = topInfluencers.map(function (corrPair, idx) {
      var bar = {};
      bar.x = corrPair[0];
      bar.y = corrPair[1];
      return bar;
    });

    barData.values = values;

    FastFlux.cycle('BAR_OPTIONS_RECEIVED', { xAxisLabel: 'features', yAxisLabel: 'correlation' });
    FastFlux.cycle('BAR_DATA_RECEIVED', barData);
  },

  corrError: function (resp) {
    console.log(resp);
  },

  handleClick: function () {
    var userFeatures = SessionStore.getUserFeatures();
    var currentFeatureIndex;
    var allSeries = [];

    var today = moment(new Date());
    var withinBounds =  function (date, dateBound) {
      if (dateBound === 'Max') {
        return true;
      } else if (dateBound === 'Month') {
        return 31 >= moment.duration(today.diff(moment(date))).asDays();
      } else if (dateBound === 'Week') {
        return 7 >= moment.duration(today.diff(moment(date))).asDays();
      }
    };

    for (var i = 0; i < userFeatures.length; i++) {
      var feature = userFeatures[i];
      var series = {};
      series.name = feature.name;
      series.values = [];

      for (var j = 0; j < feature.data.length; j++) {
        if (withinBounds(feature.data[j].dateTime, GraphStore.getDateBound())) {
          series.values.push({ x: feature.data[j].dateTime, y: parseInt(feature.data[j].value) });
        }
      }

      allSeries.push({ name: series.name, values: series.values });
    }

    processedData = [];

    var checkDone = function (allSeries) {
      for (var i = 0; i < allSeries.length; i++) {
        if (allSeries[i].values.length != 0) {
          return false;
        }
      };

      return true;
    };

    while (!checkDone(allSeries)) {
      var indexQueue = [];
      var earliestDate = Date.now();

      for (var i = 0; i < allSeries.length; i++) {
        if (allSeries[i].values.length != 0) {
          if ((new Date(allSeries[i].values[0].x)).getTime() == earliestDate) {
            indexQueue.push(i);
          } else if ((new Date(allSeries[i].values[0].x)).getTime() < earliestDate) {
            indexQueue = [i];
            earliestDate = (new Date(allSeries[i].values[0].x)).getTime();
          }
        }
      };

      var thisRow = {};
      for (var i = 0; i < allSeries.length; i++) {
        if (indexQueue[0] != i) {
          thisRow[allSeries[i].name] = null;
        } else {
          thisRow[allSeries[i].name] = allSeries[i].values.shift().y;
          indexQueue.shift();
        }
      };

      processedData.push(thisRow);
    }

    FastFlux.webCycle('post', '/auth/correlateMany', {
      success: this.corrSuccess,
      error: this.corrError,
      shouldStoreReceive: false,
      body: { data: JSON.stringify(processedData) },
    });

  },

  render: function () {
    var buttonStyle = { marginLeft: '10px' };
    return (
      <div style={{ display: 'inline-block' }}>
        <button
          className="ui green button"
          onClick={this.handleClick}
          style={buttonStyle}
        >
          Find Influencers
        </button>
      </div>
    );
  },
});

module.exports = FindInfluencersButton;
