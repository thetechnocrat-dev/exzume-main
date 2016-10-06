var React = require('react');
var moment = require('moment');
var Recharts = require('recharts');
var BarChart = Recharts.BarChart;
var Bar = Recharts.Bar;
var XAxis = Recharts.XAxis;
var YAxis = Recharts.YAxis;
var CartesianGrid = Recharts.CartesianGrid;
var Tooltip = Recharts.Tooltip;

const SimpleBarChart = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    featureName: React.PropTypes.string.isRequired,
  },

  makeTitle: function () {
    var data = this.props.data;
    var startDate = moment(data[0].dateTime, 'YYYY-MM-DD').format('MMM D, YYYY');
    var endDate = moment(data[data.length - 1].dateTime, 'YYYY-MM-DD').format('MMM D, YYYY');

    return (
      <div className="ui medium header" style={{ display: 'inline-block', margin: '0' }}>
        { startDate + ' - ' + endDate }
      </div>
    );
  },

  makeSubtitle: function () {
    var data = this.props.data;

    return (
      <div className="meta" style={{ display: 'inline-block', margin: '0' }}>
        { 'Last ' + data.length + ' Days - ' + this.props.featureName }
      </div>
    );
  },

  formatData: function () {
    var data = this.props.data;
    var formattedData = [];

    for (var i = 0; i < data.length; i++) {
      // make copy so original array is not mutated
      formattedData.push({
        dateTime: data[i].dateTime.slice(-5),
        value: data[i].value,
      });
    }

    return formattedData;
  },

  render: function () {
    return (
      <div style={{ textAlign: 'center' }}>
        {this.makeTitle()}
        <br />
        {this.makeSubtitle()}
        <BarChart width={450} height={300} data={this.formatData()}
          margin={{ top: 25, right: 35, bottom: 10 }}>
         <XAxis
           dataKey="dateTime"
           padding={{ left: 10, right: 10 }}
         />
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>
    );
  },
});

var WeekBarChart = React.createClass({

  propTypes: {
    featureName: React.PropTypes.string.isRequired,
    weekData: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div>
        <SimpleBarChart
          featureName={this.props.featureName}
          data={this.props.weekData}
        />
      </div>
    );
  },

});

module.exports = WeekBarChart;
