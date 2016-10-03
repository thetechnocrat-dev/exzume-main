var React = require('react');
var Recharts = require('recharts');
var Style = require('../../util/style');
const { PieChart, Pie, Sector, Cell } = Recharts;
const COLORS = [Style.green, Style.gray, Style.red];

// accepts data as prop in the following format:
// const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
//               { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
          fill, payload, percent, value, } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy * 0.9} dy={8} textAnchor="middle" fill={'black'}>{payload.name}</text>
      <text
        x={cx}
        y={cy * 1.1}
        dy={8}
        textAnchor="middle"
        fill={'black'}
      >
        {`${(percent * 100).toFixed(1)}%` + ' (' + `${value} hours` + ')'}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

var DoughnutViz = React.createClass({
  propTypes: {
    chartData: React.PropTypes.array.isRequired,
    chartDiameter: React.PropTypes.number.isRequired,
  },

  getInitialState: function () {
    return ({ activeIndex: 0 });
  },

  onPieEnter: function (data, index) {
    this.setState({ activeIndex: index });
  },

  render: function () {
    chartOptions = {};

    return (
      <PieChart
        width={this.props.chartDiameter}
        height={this.props.chartDiameter}
        onMouseEnter={this.onPieEnter}
        style={{ marginLeft: '-15px' }}
      >
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.props.chartData}
          innerRadius={this.props.chartDiameter * 0.25}
          outerRadius={this.props.chartDiameter * 0.4}
          fill="#8884d8"
        >
          {
            this.props.chartData.map((entry, index) =>
              <Cell fill={COLORS[index % COLORS.length]}/>
            )
          }
       </Pie>
       </PieChart>
    );
  },

});

module.exports = DoughnutViz;

