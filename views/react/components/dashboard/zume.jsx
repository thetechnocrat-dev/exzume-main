var React = require('react');
var d3 = require('d3');
var rd3 = require('rd3');
var LineChart = rd3.LineChart;

var Zume = React.createClass({
  propTypes: {
    zume: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    var graphFeature = this.findUserFeaturesFromUser(this.props.user);
    var seriesData = this.makeSeriesData(graphFeature);
    return { seriesData: seriesData };
  },

  componentWillReceiveProps: function (newProps) {
    var graphFeatures = this.findUserFeatureFromUser(newProps.user);
    var seriesData = this.makeSeriesData(graphFeatures);

    this.setState({ seriesData: seriesData });
  },

  findUserFeaturesFromUser: function (user) {
    var graphFeatures = [];
    var dataStreams = user.datastreams;
    for (key in dataStreams) {
      for (var i = 0; i < dataStreams[key].features.length; i++) {
        if (this.props.zume.featureNames.includes(dataStreams[key].features[i].name)) {
          graphFeatures.push(dataStreams[key].features[i]);
        }
      }
    }

    return graphFeatures;
  },

  makeSeriesData: function (userFeatures) {
    var seriesData = [];
    for (var i = 0; i < userFeatures.length; i++) {
      var feature = userFeatures[i];
      var series = {};
      series.name = feature.name;
      series.values = [];
      for (var j = 0; j < feature.data.length; j++) {
        series.values.push({ x: feature.data[j].dateTime, y: parseInt(feature.data[j].value) });
      }

      seriesData.push(series);
    }

    return seriesData;
  },

  makeGraph: function () {
    console.log(this.props);
    return (
      <LineChart
        legend={true}
        data={this.state.seriesData}
        width='100%'
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 500,
          height: 400,
        }}
        yAxisLabel={this.props.zume.featureName}
        xAxisLabel="Date"
        xAccessor={
          function (d) {
            return new Date(d.x);
          }
        }
        xAxisTickInterval={{ unit: 'day', interval: 1 }}
        gridHorizontal={true}
        colors={d3.scale.category10()}
      />
    );
  },

  render: function () {
    return (
      <div>
        {this.makeGraph()}
      </div>
    );
  },

});

module.exports = Zume;
