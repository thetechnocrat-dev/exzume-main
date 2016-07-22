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
    var graphFeature = this.findUserFeatureFromUser(this.props.user);
    var seriesData = this.makeSeriesData(graphFeature);
    return { seriesData: seriesData };
  },

  componentWillReceiveProps: function (newProps) {
    var graphFeature = this.findUserFeatureFromUser(newProps.user);
    var seriesData = this.makeSeriesData(graphFeature);

    this.setState({ seriesData: seriesData });
  },

  findUserFeatureFromUser: function (user) {
    var dataStreams = user.datastreams;
    for (key in dataStreams) {
      for (var i = 0; i < dataStreams[key].features.length; i++) {
        if (dataStreams[key].features[i].name == this.props.zume.featureName) {
          return dataStreams[key].features[i];
        }
      }
    }
  },

  makeSeriesData: function (userFeature) {
    var seriesData = [];
    var data = userFeature.data || [];
    for (var i = 0; i < data.length; i++) {
      seriesData.push({ x: data[i].dateTime,
                         y: data[i].value, });
    }

    return seriesData;
  },

  makeGraph: function () {
    return (
      <LineChart
        legend={true}
        data={[{
          name: 'series 1',
          values: this.state.seriesData,
        }]}
        width='100%'
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 500,
          height: 400,
        }}
        title={this.props.zume.featureName + ' vs. Day'}
        yAxisLabel={this.props.zume.featureName}
        xAxisLabel="Date"
        xAccessor={
          function (d) {
            return new Date(d.x);
          }
        }
        xAxisTickInterval={{unit: 'day', interval: 1}}
        gridHorizontal={true}
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
