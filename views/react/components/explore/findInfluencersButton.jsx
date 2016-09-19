var React = require('react');
var GraphStore = require('../../stores/graphStore');
var SessionStore = require('../../stores/sessionStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var moment = require('moment');

var FindInfluencersButton = React.createClass({
  propTypes: {
    feature: React.PropTypes.array.isRequired,
  },

  corrSuccess: function (res) {
    console.log(res);
    FastFlux.cycle('GRAPH_TYPE_RECEIVED', 'bar');
  },

  corrError: function (resp) {
    console.log(resp);
  },

  handleClick: function () {
    var userFeatures = SessionStore.getUserFeatures();
    var currentFeatureName = GraphStore.getSeriesData()[0].name;
    var currentFeatureIndex;
    var allSeries = [];

    for (var i = 0; i < userFeatures.length; i++) {
      if (userFeatures[i].name == currentFeatureName) {
        currentFeatureIndex = i;
      }
    };

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

    console.log(processedData);

    FastFlux.webCycle('post', '/auth/correlate', {
      success: this.corrSuccess,
      error: this.corrError,
      shouldStoreReceive: false,
      body: { data: JSON.stringify(processedData) },
    });

  },

  render: function () {
    return (
      <div className="ui green button" onClick={this.handleClick}>Find Influencers</div>
    );
  },
});

module.exports = FindInfluencersButton;
