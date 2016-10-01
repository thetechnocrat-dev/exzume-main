var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux.js');
var moment = require('moment');

// Components
var CorrelateWithItem = require('./correlateWithItem');

var CorrelateDropdown = React.createClass({
  propTypes: {
    isDisabled: React.PropTypes.bool.isRequired,
    dataStreams: React.PropTypes.array.isRequired,
    currentFeatureName: React.PropTypes.string.isRequired,
    features: React.PropTypes.array.isRequired,
  },

  componentDidMount: function () {
    $('#correlateDropdown')
      .dropdown({
        action: 'select',
      })
    ;
  },

  clickCorrelateWithItem: function (feature) {
    FastFlux.cycle('CORRELATE_SCATTER_RECEIVED', feature);
  },

  makeCorrelateWithItems: function () {
    var _this = this;
    return this.props.dataStreams.map(function (dataStream, idx) {
      if (dataStream.name != 'Personal Survey') {
        return (
          <CorrelateWithItem
            className="item"
            key={idx}
            dataStream={dataStream}
          />
        );
      }
    });
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
    console.log(res);
    var currentFeatureName = this.props.currentFeatureName;
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

    var barCorrelateData = topInfluencers.map(function (corrPair) {
      return { name: corrPair[0], correlation: corrPair[1] };
    });

    console.log(barCorrelateData);

    FastFlux.cycle('CORRELATE_BAR_RECEIVED', barCorrelateData);
  },

  corrError: function (resp) {
    console.log(resp);
  },

  clickCorrelateWithAll: function () {
    FastFlux.cycle('GRAPH_DISPLAY_RECEIVED', 'correlateBar');

    var userFeatures = this.props.features;
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
        if (withinBounds(feature.data[j].dateTime, 'Month')) {
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

    FastFlux.webCycle('post', '/auth/correlateMany', {
      success: this.corrSuccess,
      error: this.corrError,
      shouldStoreReceive: false,
      body: { data: JSON.stringify(processedData) },
    });

  },

  render: function () {
    if (this.props.isDisabled) {
      var className = 'ui disabled dropdown';
    } else {
      var className = 'ui dropdown';
    }

    return (
      <div className={className} id="correlateDropdown">
        <input type="hidden" name="gender" />
        <div className="text">Correlate</div>
        <i className="dropdown icon" />
        <div className="menu">
          <div className="item" onClick={this.clickCorrelateWithAll}>
            Correlate With All
          </div>
          <div className="item">
            <i className="dropdown icon" />
            Correlate With
            <div className="menu">
              {this.makeCorrelateWithItems()}
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = CorrelateDropdown;

