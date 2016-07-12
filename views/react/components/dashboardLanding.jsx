var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../stores/sessionStore');

//components
var Survey = require('./survey');
var DataStreamIndex = require('./dataStreamIndex');
var InsightIndex = require('./insightIndex');
var DataExpTool = require('./dataExpTool');
var DataVisIndex = require('./dataVisIndex');

var DashboardLanding = React.createClass({
  mixins: [History],

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    this.sessionToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionToken.remove();
  },

  clickSurvey: function () {
    var url = SessionStore.currentUser().formURL;
    var win = window.open(url, '_blank');
    win.focus();
  },

  makeDashboard: function () {
    if (SessionStore.isSignedIn()) {
      return (
        <div>
          <h1 className="ui left aligned header">Your Daily Trackings</h1>
          <Survey />
          <h1 className="ui left aligned header">Your Data Streams</h1>
          <DataStreamIndex />
          <h1 className="ui header">Your Insights</h1>
          <InsightIndex />
          <h1 className="ui header">Data Exploration Tool</h1>
          <p>Choose any two features to correlate.</p>
          <DataExpTool />
          <h1 className="ui header">Your Data Visualizations</h1>
          <DataVisIndex user={SessionStore.currentUser()} />
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  },

  render: function () {
    return (
      <div>
        {this.makeDashboard()}
      </div>
    );
  },
});

module.exports = DashboardLanding;
