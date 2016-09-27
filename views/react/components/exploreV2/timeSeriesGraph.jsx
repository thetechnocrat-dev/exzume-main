var React = require('react');
var Recharts = require('recharts');
var moment = require('moment');
const { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } = Recharts;

var TimeSeriesCompareGraph = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  makeScatters: function () {
    var _this = this;
    return this.props.data.map(function (series, idx) {
      return (
        <Scatter
          key={idx}
          name={series.name}
          data={series.data}
          line
          fill='#8884d8'
        />
      );
    });
  },

  render: function () {
    return (
      <ScatterChart
        width={this.props.width}
        height={this.props.height}
        margin={{ top: 20, right: 50, bottom: 20, left: -10 }}
      >
        <XAxis
          dataKey={'x'}
          name='date'
          type='number'
          tickFormatter={
            function (date) {
              return moment(date).utc().format('MM-DD-YY');
            }
          }
          tickSize={14}
          tick={{ strokeWidth: 0 }}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis dataKey={'y'} name='value' />
        <CartesianGrid />
        <Tooltip
          formatter={
            function (value, name) {
              if (name == 'date') {
                return moment(value).utc().format('MM-DD-YY');
              } else if (name == 'value') {
                return value;
              }
            }
          }
          cursor={{ strokeDasharray: '3 3' }}/>
        <Legend/>
        {this.makeScatters()}
      </ScatterChart>
    );
  },

});

module.exports = TimeSeriesCompareGraph;

