var React = require('react');
var Recharts = require('recharts');
const { PieChart, Pie, Sector, ResponsiveContainer } = Recharts;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
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
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} hours`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

var DoughnutViz = React.createClass({
  propTypes: {
    chartData: React.PropTypes.array.isRequired,
    // label: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return ({ activeIndex: 0 });
  },

  onPieEnter: function (data, index) {
    this.setState({ activeIndex: index });
  },

  componentDidMount: function () {
    console.log('doughnut viz / twolevelpiechart');
    console.log(this.props);
  },

  render: function () {
    chartOptions = {};

    return (
      <ResponsiveContainer width={'100%'}>
        <PieChart width={600} height={300} onMouseEnter={this.onPieEnter}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.props.chartData}
            cx={'25%'}
            cy={'50%'}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"/>
         </PieChart>
       </ResponsiveContainer>
    );

    // return (
    //   <div>
    //     <DoughnutChart data={this.props.chartData} options={chartOptions}/>
    //     <br />
    //     {this.props.label}
    //   </div>
    // );
  },

});

module.exports = DoughnutViz;
