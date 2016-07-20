var React = require('react');
var PropTypes = React.PropTypes;
var GraphStore = require('../../stores/graphStore');
var rd3 = require('rd3');
var LineChart = rd3.LineChart;

var ExploreGraph = React.createClass({
  getInitialState: function () {
    return { currentFeatures: GraphStore.getCurrentFeatures() };
  },

  _onChange: function () {
    this.setState({ currentFeatures: GraphStore.getCurrentFeatures() });
  },

  componentDidMount: function () {
    this.graphToken = GraphStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.graphToken.remove();
  },

  makeGraph: function () {
    console.log(this.state.currentFeatures);
    console.log(Array.isArray(this.state.currentFeatures));
    if (this.state.currentFeatures.length > 0) {
      return (
        <LineChart
          legend={true}
          data={[{
            name: 'series 1',
            values: this.state.currentFeatures,
          }]}
          width='100%'
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 500,
            height: 400
          }}
          title="Steps vs. Time"
          yAxisLabel="Steps"
          xAxisLabel="Date"
          gridHorizontal={true}
        />
      );
    }
  },

  render: function () {
    return (
      <div>
        Here's your data:
        {JSON.stringify(this.state.currentFeatures)}
        <div class="ui container">
          {this.makeGraph()}
        </div>
      </div>
    );
  },

});

module.exports = ExploreGraph;
