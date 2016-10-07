var React = require('react');
var Recharts = require('recharts');
var moment = require('moment');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var ScatterChart = Recharts.ScatterChart;
var Scatter = Recharts.Scatter;
var XAxis = Recharts.XAxis;
var YAxis = Recharts.YAxis;
var ZAxis = Recharts.ZAxis;
var CartesianGrid = Recharts.CartesianGrid;
var Tooltip = Recharts.Tooltip;
var Legend = Recharts.Legend;

const fillColors = [
                    '#023fa5', '#7d87b9', '#bec1d4', '#d6bcc0', '#bb7784', '#8e063b', '#4a6fe3',
                    '#8595e1', '#b5bbe3', '#e6afb9', '#e07b91', '#d33f6a', '#11c638', '#8dd593',
                    '#c6dec7', '#ead3c6', '#f0b98d', '#ef9708', '#0fcfc0', '#9cded6', '#d5eae7',
                    '#f3e1eb', '#f6c4e1', '#f79cd4',
                   ];

var ZumeCorrelation = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    correlation: React.PropTypes.string.isRequired,
    confidence: React.PropTypes.string.isRequired,
  },

  makeScatters: function () {
    var _this = this;
    return this.props.data.map(function (series, idx) {
      return (
        <Scatter
          key={idx}
          name={series.name}
          data={series.data}
          fill={fillColors[idx % fillColors.length]}
        />
      );
    });
  },

  makeCorrelationInfo: function () {
    return (
      <div style={{ }}>
          {'correlation: ' + this.props.correlation + ', confidence: ' +
            this.props.confidence + '%'}
      </div>
    );
  },

  render: function () {
    console.log(this.props);
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className="ui medium header"
          style={{ display: 'inline-block', margin: '0 auto' }}
        >
          {this.props.data[0].name}
        </div>
        {this.makeCorrelationInfo()}
        <ScatterChart
          width={700}
          height={500}
          margin={{ top: 20, right: 50, bottom: 20, left: -10 }}
        >
          <XAxis
            dataKey={'x'}
            name={this.props.data[0].xLabel}
            type='number'
            tickSize={14}
            tick={{ strokeWidth: 0 }}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            dataKey={'y'}
            name={this.props.data[0].yLabel}
            domain={['dataMin', 'dataMax']}
          />
          <CartesianGrid />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}/>
          {this.makeScatters()}
        </ScatterChart>
        <div>{this.props.message}</div>
      </div>
    );
  },

});

module.exports = ZumeCorrelation;

