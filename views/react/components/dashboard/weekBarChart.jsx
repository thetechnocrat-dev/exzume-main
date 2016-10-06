var React = require('react');
var Recharts = require('recharts');
var BarChart = Recharts.BarChart;
var Bar = Recharts.Bar;
var XAxis = Recharts.XAxis;
var YAxis = Recharts.YAxis;
var CartesianGrid = Recharts.CartesianGrid;
var Tooltip = Recharts.Tooltip;
var Legend = Recharts.Legend;

// const data = [
//   { name: 'Page A', uv: 4000 },
//   { name: 'Page B', uv: 3000 },
//   { name: 'Page C', uv: 2000 },
//   { name: 'Page D', uv: 2780 },
//   { name: 'Page E', uv: 1890 },
//   { name: 'Page F', uv: 2390 },
//   { name: 'Page G', uv: 3490 },
// ];

const SimpleBarChart = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
  },

  formatData: function () {
    var data = this.props.data;

    for (var i = 0; i < data.length; i++) {
      data[i].dateTime = data[i].dateTime.slice(-5);
    }

    return data;
  },

  render: function () {
    return (
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
    );
  },
});

var WeekBarChart = React.createClass({

  propTypes: {
    weekData: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div>
        <SimpleBarChart data={this.props.weekData}/>
      </div>
    );
  },

});

module.exports = WeekBarChart;
