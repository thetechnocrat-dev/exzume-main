var React = require('react');
var PropTypes = React.PropTypes;
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var DropdownItem = React.createClass({
  onClick: function () {
    var featureData = [];
    // var dates = this.props.dates;
    var data = this.props.data;
    var name = this.props.name;
    // for (var i = 0; i < dates.length; i++) {
    //   featureData.push({ x: (new Date(dates[i])).getTime(), y: data[i] });
    // }
    for (var i = 0; i < this.props.data.length; i++) {
      featureData.push({ x: this.props.data[i].dateTime,
                         y: this.props.data[i].value });
    }
    console.log(featureData);

    FastFlux.cycle('FEATURE_RECEIVED', featureData);
  },

  render: function () {
    return (
      <div className="item" onClick={this.onClick}>{this.props.name}</div>
    );
  },

});

module.exports = DropdownItem;
