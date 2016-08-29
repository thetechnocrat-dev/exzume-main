var React = require('react');
var GraphStore = require('../../stores/graphStore');
var d3 = require('d3');
var rd3 = require('rd3');
var LineChart = rd3.LineChart;

var ExploreGraph = React.createClass({
  propTypes: {
    seriesData: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  makeGraph: function () {
    if (this.props.seriesData.length === 0) {
      var seriesData = [{ name: 'nothing selected', values: [{ x: '2016-07-16', y: '0' }] }];
    } else {
      var seriesData = this.props.seriesData;
    }

    var maxLength = 0;
    for (var i = 0; i < seriesData.length; i++) {
      if (seriesData[0].values.length > maxLength) { maxLength = seriesData[0].values.length; }
    }

    var unit;
    if (maxLength >= 70) {
      unit = 'month';
    } else if (maxLength >= 21) {
      unit = 'week';
    } else {
      unit = 'day';
    }

    return (
      <LineChart
        legend={true}
        data={seriesData}
        width='100%'
        height={this.props.height}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: this.props.width,
          height: this.props.height,
        }}
        yAxisLabel="Value"
        xAxisLabel="Date"
        xAccessor={
          function (d) {
            return new Date(d.x);
          }
        }
        xAxisTickInterval={{ unit: unit, interval: 1 }}
        domain={{ y: [0] }}
        gridHorizontal={true}
        colors={d3.scale.category10()}
      />
    );
  },

  render: function () {
    return (
      <div>
        <div className="ui container">
          {this.makeGraph()}
        </div>
      </div>
    );
  },

});

module.exports = ExploreGraph;

