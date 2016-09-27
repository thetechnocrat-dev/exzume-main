var React = require('react');

var AddFeatureDropdown = React.createClass({
  componentDidMount: function () {
    $('#addFeatureDropdown')
      .dropdown()
    ;
  },

  render: function () {
    return (
      <div className="ui multiple dropdown" id="addFeatureDropdown">
        <input type="hidden" name="filters" />
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

module.exports = AddFeatureDropdown;

