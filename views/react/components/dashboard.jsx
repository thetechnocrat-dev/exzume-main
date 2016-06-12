var React = require('react');
var History = require('react-router').History;

// Components
var Navbar = require('./navbar');
var DataStreamIndex = require('./dataStreamIndex');
var InsightIndex = require('./insightIndex');
var DataVisualizationIndex = require('./dataVisualizationIndex');
var AuthStore = require('../stores/authStore');

var Dashboard = React.createClass({
  mixins: [History],

  clickSurvey: function () {
    var url = AuthStore.currentUser().formURL;
    var win = window.open(url, '_blank');
    win.focus();
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
        <h1 className="ui header">Your Data Visualizations (coming soon)</h1>
        <DataVisualizationIndex />
        {this.props.children}
      </div>
    );
  },
});

module.exports = Dashboard;
