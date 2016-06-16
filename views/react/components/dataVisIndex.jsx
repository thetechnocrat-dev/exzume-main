var React = require('react');

// components
var DataVisItem = require('./dataVisItem');

var DataVisIndex = React.createClass({

  render: function () {
    return (
      <div className="ui centered grid">
        <div className="doubling two column row">
            <DataVisItem image="http://nvd3.org/examples/img/horizontalbar.png" />
            <DataVisItem image="http://nvd3.org/examples/img/line.png" />
            <DataVisItem image="http://nvd3.org/examples/img/scatter.png" />
            <DataVisItem image="http://nvd3.org/examples/img/stackedbar.png" />
        </div>
      </div>
    );
  },

});

module.exports = DataVisIndex;
