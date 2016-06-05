var React = require('react');

// Components
var Navbar = require('./navbar');
var NavbarHolder = require('./navbarHolder');
var NavbarExtender = require('./navbarExtender');
var DataStreamIndex = require('./dataStreamIndex');
var InsightIndex = require('./insightIndex');
var DataVisualizationIndex = require('./dataVisualizationIndex');
var App = React.createClass({

  render: function () {

    return (
      <div>
        <Navbar />
        <NavbarHolder />
        <NavbarExtender />
        <div className="ui container">
          <h1 className="ui left aligned header">Your Data Streams</h1>
          <DataStreamIndex />
          <h1 className="ui header">Your Insights</h1>
          <InsightIndex />
          <h1 className="ui header">Your Data Visualizations</h1>
          <DataVisualizationIndex />
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = App;
