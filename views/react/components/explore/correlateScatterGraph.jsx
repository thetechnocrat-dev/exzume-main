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

  getInitialState: function () {
    return { correlation: null, confidence: null, isLoading: true, error: null };
  },

  corrSuccess: function (res) {
    var correlation = parseFloat(res[0]).toFixed(2);
    var confidence = parseFloat(100 - (res[1] * 100)).toFixed(2);
    FastFlux.cycle(
      'CORRELATE_SCATTER_INFO_RECEIVED', { correlation: correlation, confidence: confidence }
    );
    this.setState({ correlation: correlation, confidence: confidence, isLoading: false });
  },

  corrError: function (res) {
    this.setState({ error: 'Sorry, something went wrong with our analytic server' });
  },

  getCorrelation: function (data) {
    arr1 = [];
    arr2 = [];
    for (var i = 0; i < data.length; i++) {
      arr1.push(data[i].x);
      arr2.push(data[i].y);
    }

    FastFlux.webCycle('post', '/auth/correlateTwo', {
      success: this.corrSuccess,
      error: this.corrError,
      shouldStoreReceive: false,
      body: { data: JSON.stringify({ f1: arr1, f2: arr2 }) },
    });
  },

  componentDidMount: function () {
    this.getCorrelation(this.props.data[0].data);
  },

  componentWillReceiveProps: function (newProps) {
    this.getCorrelation(newProps.data[0].data);
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

  clickBackIcon: function (e) {
    e.preventDefault();
    FastFlux.cycle('GRAPH_DISPLAY_RECEIVED', 'timeSeries');
  },

  makeCorrelationInfo: function () {
    if (this.state.isLoading) {
      return (
        <div className="ui active text loader">Calculating Correlation</div>
      );
    } else if (this.state.correlation && this.state.confidence) {
      return (
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <div className="ui message" style={{ padding: '5px 10px 5px 10px' }}>
            {'correlation: ' + this.state.correlation + ', confidence: ' +
              this.state.confidence + '%'}
          </div>
        </div>
      );
    }
  },

  render: function () {
    console.log(this.state);
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
        <div className="ui right floated icon button">
          <i className="reply icon" onClick={this.clickBackIcon} />
        </div>
        <ScatterChart
          width={this.props.width}
          height={this.props.height}
          margin={{ top: 20, right: 50, bottom: 20, left: -10 }}
        >
          <XAxis
            dataKey={'x'}
            name={this.props.data[0].xLabel}
            type='number'
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            dataKey={'y'}
            name={this.props.data[0].yLabel}
            domain={['dataMin', 'dataMax']}
          />
          <CartesianGrid />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
          />
          {this.makeScatters()}
        </ScatterChart>
      </div>
    );
  },

});

module.exports = TimeSeriesCompareGraph;
