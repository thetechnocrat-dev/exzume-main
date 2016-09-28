var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux.js');

var CorrelateDropdown = React.createClass({
  propTypes: {
    isDisabled: React.PropTypes.bool.isRequired,
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
              <div className="item">feature1</div>
              <div className="item">feature2</div>
              <div className="item">feature3</div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = CorrelateDropdown;

