var React = require('react');

var DataVisItem = React.createClass({

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

module.exports = DataVisItem;
