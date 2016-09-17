var React = require('react');
var Style = require('../../util/style');

var HorzBarViz = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    avg: React.PropTypes.number.isRequired,
    current: React.PropTypes.number.isRequired,
    fillColor: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
  },

  calcPercent: function (avg, current) {
    var percentFilled = (current / avg);

    if (percentFilled >= 1) {
      return '100%';
    } else {
      return (percentFilled * 100).toFixed(2) + '%';
    }
  },

  render: function () {
    var fillStyle = {
      backgroundColor: this.props.fillColor,
      width: this.calcPercent(this.props.avg, this.props.current),
      height: '100%',
    };
    var backgroundStyle = {
      width: '100%',
      height: '8px',
      backgroundColor: this.props.backgroundColor,
    };
    var outerStyle = { padding: '10px' };
    var labelStyle = {
      marginBottom: '8px',
      textAlign: 'left',
      width: '50%',
      display: 'inline-block',
    };
    var secondLabelStyle = {
      marginBottom: '8px',
      textAlign: 'right',
      width: '50%',
      display: 'inline-block',
    };

    return (
      <div style={outerStyle}>
        <div style={labelStyle}>{this.props.current.toFixed() + ' ' + this.props.label}</div>
        <div style={secondLabelStyle}>{this.props.avg.toFixed() + ' avg'}</div>
        <div style={backgroundStyle}>
          <div style={fillStyle} />
        </div>
      </div>
    );
  },

});

module.exports = HorzBarViz;

