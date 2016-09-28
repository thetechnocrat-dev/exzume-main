var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var TimeDropdown = React.createClass({
  propTypes: {
    isDisabled: React.PropTypes.bool.isRequired,
  },

  componentDidMount: function () {
    $('#timeDropdown')
      .dropdown()
    ;
  },

  handleClick: function (time) {
    FastFlux.cycle('FILTER_RECEIVED', { key: 'dateBound', value: time });
  },

  makeDropdownItems: function () {
    var times = ['week', 'month', 'max'];
    var _this = this;
    return times.map(function (time, idx) {
      return (
        <div className="item" key={idx} onClick={_this.handleClick.bind(null, time)}>
         {time}
        </div>
      );
    });
  },

  render: function () {
    if (this.props.isDisabled) {
      var className = 'ui disabled dropdown';
    } else {
      var className = 'ui dropdown';
    }

    return (
      <div className={className} id="timeDropdown" style={{ paddingRight: '1px' }}>
        <div className="text">week</div>
        <i className="dropdown icon" />
        <div className="menu">
          {this.makeDropdownItems()}
        </div>
      </div>
    );
  },

});

module.exports = TimeDropdown;

