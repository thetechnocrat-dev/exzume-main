var React = require('react');

// components
var DataVisItem = require('./dataVisItem');

var DataVisIndex = React.createClass({

  render: function () {
    return (
      <div className="ui centered grid">
        <div className="doubling two column row">
          {this.props.user.vis.map(function (v, i) {
            return (
              <DataVisItem key={i} image={v.url} />
            );
          })}
        </div>
      </div>
    );
  },

});

module.exports = DataVisIndex;
