var React = require('react');
var Recharts = require('recharts');
var moment = require('moment');
const { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } = Recharts;

const fillColors = [
                    '#023fa5', '#7d87b9', '#bec1d4', '#d6bcc0', '#bb7784', '#8e063b', '#4a6fe3',
                    '#8595e1', '#b5bbe3', '#e6afb9', '#e07b91', '#d33f6a', '#11c638', '#8dd593',
                    '#c6dec7', '#ead3c6', '#f0b98d', '#ef9708', '#0fcfc0', '#9cded6', '#d5eae7',
                    '#f3e1eb', '#f6c4e1', '#f79cd4',
                   ];

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
          fill={fillColors[idx % fillColors.length]}
        />
      );
    });
  },

  render: function () {
    if (this.props.data[0].name == 'nothing selected') {
      var title = 'Select a Feature to Begin';
    } else {
      var title = this.props.data[0].name + ' Over Time';
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className="ui medium header"
          style={{ display: 'inline-block', margin: '0' }}
        >
          {title}
        </div>
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
      </div>
    );
  },

});

module.exports = TimeSeriesCompareGraph;
