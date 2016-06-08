var React = require('react');

var DataVisualizationItem = React.createClass({

  render: function () {
    return (
      <div className="column">
        <div className="ui large image">
          <img src={this.props.image} />
        </div>
      </div>
    );
  },

});

module.exports = DataVisualizationItem;
