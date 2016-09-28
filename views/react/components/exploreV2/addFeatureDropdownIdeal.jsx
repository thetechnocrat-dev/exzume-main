var React = require('react');
var Style = require('../../util/style');

var AddFeatureDropdownIdeal = React.createClass({
  componentDidMount: function () {
    $('#addFeatureDropdown')
      .dropdown()
    ;
  },

  getInitialState: function () {
    return { value: 'hi' };
  },

  handleChange: function (event) {
    console.log('on change');
    this.setState({ value: event.target.value });
  },

  render: function () {
    return (
      <div
        className="ui multiple dropdown"
        id="addFeatureDropdown"
      >
        <input
          type="hidden"
          name="filters"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <span className="text">Compare</span>
        <div className="menu">
          <div className="scrolling menu">
            <div className="item" data-value="important">
              Important
            </div>
            <div className="item" data-value="announcement">
              Announcement
            </div>
          </div>
        </div>
        <i className="plus icon" />
      </div>
    );
  },

});

module.exports = AddFeatureDropdownIdeal;

