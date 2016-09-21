var React = require('react');
var GraphStore = require('../../stores/graphStore');
var d3 = require('d3');
var rd3 = require('rd3');
var BarChart = rd3.BarChart;
var Style = require('../../util/style');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var GroupedBarExploreGraph = React.createClass({
  propTypes: {
    groupedBarData: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  handleClick: function () {
    console.log('handle click');
    FastFlux.cycle('GRAPH_TYPE_RECEIVED', 'line');
  },

  render: function () {
    console.log(this.props.groupedBarData);
    console.log(Style.lightBackground);
    var outerStyle = {
      zIndex: 4, position: 'relative', backgroundColor: Style.lightBackground, marginTop: '-39px',
    };

    return (
      <div style={outerStyle}>
        <div className="ui green icon button" onClick={this.handleClick} style={{ float: 'right' }}>
          <i className="remove icon" />
        </div>
        <BarChart
          grouped={true}
          style={{ zIndex: 2 }}
          data={this.props.groupedBarData}
          width={this.props.width}
          height={this.props.height}
          title={this.props.title}
          xAxisLabel={'features'}
          yAxisLabel={'mean'}
        />
      </div>
    );
  },

});

module.exports = GroupedBarExploreGraph;

