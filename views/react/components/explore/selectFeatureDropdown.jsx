var React = require('react');
var Style = require('../../util/style');

// Components
var SelectFeatureDropdownItem = require('./selectFeatureDropdownItem');

var SelectFeatureDropdown = React.createClass({
  propTypes: {
    dataStreams: React.PropTypes.array.isRequired,
  },

  componentDidMount: function () {
    $('#selectFeatureDropdown')
      .dropdown()
    ;
  },

  makeDropdownItems: function () {
    return this.props.dataStreams.map(function (dataStream, idx) {
      if (dataStream.name != 'Personal Survey') {
        return (
          <SelectFeatureDropdownItem
            key={idx}
            dataStream={dataStream}
          />
        );
      }
    });
  },

  render: function () {
    return (
      <div
        className="ui dropdown"
        id="selectFeatureDropdown"
        style={{ float: 'left' }}
      >
        <input type="hidden" name="select a feature to explore" />
        <div className="default text"
          style={{ color: 'black' }}
        >
          {'Select a Feature to Explore'}
        </div>
        <i className="dropdown icon" />
        <div className="menu">
          {this.makeDropdownItems()}
        </div>
      </div>
    );
  },

});

module.exports = SelectFeatureDropdown;

