var React = require('react');
var History = require('react-router').History;

// Components
var Navbar = require('./navbar');
var DataStreamIndex = require('./dataStreamIndex');
var InsightIndex = require('./insightIndex');
var DataVisualizationIndex = require('./dataVisualizationIndex');

var Dashboard = React.createClass({
  mixins: [History],

  clickSurvey: function () {
    this.history.push('/survey');
  },

  render: function () {

    return (
      <div className="ui container">
        <Navbar />
        <div className="ui blue button" onClick={this.clickSurvey}>Fill out daily survey</div>
        <h1 className="ui left aligned header">Your Data Streams</h1>
        <DataStreamIndex />
        <h1 className="ui header">Your Insights</h1>
        <InsightIndex />
        <h1 className="ui header">Your Data Visualizations</h1>
        <DataVisualizationIndex />
        {this.props.children}
      </div>
    );
  },
});

module.exports = Dashboard;
