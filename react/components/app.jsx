var React = require('react');

// Components
var Navbar = require('./navbar');
var NavbarHolder = require('./navbarHolder');
var DataStreamIndex = require('./dataStreamIndex');
var InsightIndex = require('./insightIndex');
var DataVisualizationIndex = require('./dataVisualizationIndex');
var App = React.createClass({

  render: function () {

    return (
      <div>
        <Navbar />
        <NavbarHolder />
        <div className="ui container">
          <DataStreamIndex />
          <InsightIndex />
          <DataVisualizationIndex />
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = App;
