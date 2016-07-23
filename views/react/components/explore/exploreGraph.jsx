var React = require('react');
var GraphStore = require('../../stores/graphStore');
var d3 = require('d3');
var rd3 = require('rd3');
var LineChart = rd3.LineChart;

var ExploreGraph = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    seriesData: React.PropTypes.array.isRequired,
    currentFeature: React.PropTypes.object.isRequired,
  },

  makeGraph: function () {
    // if there is a feature render with its info, otherwise render with blank info
    if (this.props.currentFeature.name) {
      var dataName = this.props.currentFeature.name;
      var values = this.props.seriesData;
      var title = this.props.currentFeature.name + ' vs. Day';
    } else {
      var dataName = 'nothing selected';
      var values = [{ x: '2016-07-16', y: '0' }];
      var title = 'Select a Feature to Begin Exploring Your Data';
    }

    return (
      <LineChart
        legend={true}
        data={[{
          name: dataName,
          values: values,
        }]}
        width='100%'
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 500,
          height: 400
        }}
        title={title}
        yAxisLabel={dataName}
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
        Here's your data:
        {JSON.stringify(this.props.seriesData)}
        <div className="ui container">
          {this.makeGraph()}
        </div>
      </div>
    );
  },

});

module.exports = ExploreGraph;
