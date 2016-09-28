var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux.js');

var CorrelateDropdown = React.createClass({
  propTypes: {
    isDisabled: React.PropTypes.bool.isRequired,
    features: React.PropTypes.array.isRequired,
  },

  componentDidMount: function () {
    $('#correlateDropdown')
      .dropdown({
        action: 'select',
      })
    ;
  },

  makeDropdownItems: function () {
    var options = ['Correlate with all', 'Correlate with selected'];

    return options.map(function (option, idx) {
      return (
        <div className="item" key={idx}>
          {option}
        </div>
      );
    });
  },

  clickCorrelateWithItem: function (feature) {
    FastFlux.cycle('CORRELATE_SCATTER_RECEIVED', feature);
  },

  makeCorrelateWithItems: function () {
    var _this = this;
    return this.props.features.map(function (feature, idx) {
      return (
        <div
          className="item"
          key={idx}
          onClick={_this.clickCorrelateWithItem.bind(null, feature)}
        >
          {feature.name}
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
      <div className={className} id="correlateDropdown">
        <input type="hidden" name="gender" />
        <div className="text">Correlate</div>
        <i className="dropdown icon" />
        <div className="menu">
          {this.makeDropdownItems()}
          <div className="item">
            <i className="dropdown icon" />
              Correlate With
            <div className="menu">
              {this.makeCorrelateWithItems()}
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = CorrelateDropdown;

