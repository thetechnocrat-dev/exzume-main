var React = require('react');

// Components
var AddFeatureDropdownItem = require('./addFeatureDropdownItem');

var AddFeatureDropdown = React.createClass({
  propTypes: {
    dataStreams: React.PropTypes.array.isRequired,
    isDisabled: React.PropTypes.bool.isRequired,
  },

  makeDropdownItems: function () {
    var _this = this;
    return this.props.dataStreams.map(function (dataStream, idx) {
      if (dataStream.name != 'Personal Survey') {
        return (
          <AddFeatureDropdownItem
            key={idx}
            dataStream={dataStream}
          />
        );
      }
    });
  },

  render: function () {
    if (this.props.isDisabled) {
      var className = 'ui disabled simple dropdown item';
    } else {
      var className = 'ui simple dropdown item';
    }

    return (
      <div className="ui compact menu">
        <div className={className}>
          Compare
          <i className="plus icon" />
          <div className="menu">
            {this.makeDropdownItems()}
          </div>
        </div>
      </div>
    );
  },

});

module.exports = AddFeatureDropdown;
