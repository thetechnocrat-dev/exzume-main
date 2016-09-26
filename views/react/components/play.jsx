var React = require('react');
var Recharts = require('recharts');
const {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} = Recharts;

const data01 = [{x: 10, y: 30}, {x: 30, y: 200}, {x: 45, y: 100}, {x: 50, y: 400}, {x: 70, y: 150}, {x: 100, y: 250}];
const data02 = [{x: 30, y: 20}, {x: 50, y: 180}, {x: 75, y: 240}, {x: 100, y: 100}, {x: 120, y: 190}];

var Play = React.createClass({
    formatData: function () {
      if (this.props.data[0]) {
        var _this = this;
        return this.props.data[0].values.map(function (el, i) {
          return (
            {x: new Date (el.x).getTime(), y: el.y}
          );
        });
      } else {
        return [{x: 12, y: 22}];
      }
    },

  render: function () {
    console.log(this.formatData());
          return (
                    <ScatterChart width={600} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                            <XAxis dataKey={'x'} name='stature' unit='cm' domain={['dataMin', 'dataMax']}/>
                                    <YAxis dataKey={'y'} name='weight' unit='kg'/>
                                                    <CartesianGrid />
                                                            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                                                    <Legend/>
                                                                            <Scatter name='A school' data={this.formatData()} fill='#8884d8' line shape="cross"/>
                                                                                          </ScatterChart>
                                                                                              );
            }

});

module.exports = Play;

