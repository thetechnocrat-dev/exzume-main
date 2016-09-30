var React = require('react');
var Recharts = require('recharts');
var moment = require('moment');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
const { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = Recharts;

var BarCorrelateGraph = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    currentFeatureName: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
  },

  clickBackIcon: function () {
    FastFlux.cycle('GRAPH_DISPLAY_RECEIVED', 'timeSeries');
  },

  makeLoader: function () {
    if (this.props.isLoading) {
      return (
        <div className="ui active text loader">Calculating Correlations</div>
      );
    }
  },

  render: function () {
    console.log(this.props);
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className="ui medium header"
          style={{ display: 'inline-block', margin: '0' }}
        >
          {'Top Correlations with ' + this.props.currentFeatureName}
        </div>
        {this.makeLoader()}
        <div className="ui right floated icon button">
          <i className="reply icon" onClick={this.clickBackIcon} />
        </div>
        <BarChart
          width={this.props.width}
          height={this.props.height}
          data={this.props.data}
          margin={{ top: 20, right: 50, left: -10, bottom: 20 }}
        >
          <XAxis
            dataKey="name"
            tickSize={14}
          />
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke='#000' />
          <Bar dataKey="correlation" fill="#8884d8" />
        </BarChart>
      </div>
    );
  },

});

module.exports = BarCorrelateGraph;

