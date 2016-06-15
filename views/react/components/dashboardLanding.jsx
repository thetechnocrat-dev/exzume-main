var React = require('react');
var History = require('react-router').History;
var DataStreamIndex = require('./dataStreamIndex');
var InsightIndex = require('./insightIndex');
var DataVisualizationIndex = require('./dataVisualizationIndex');
var AuthStore = require('../stores/authStore');

var DashboardLanding = React.createClass({
  mixins: [History],

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.authToken.remove();
  },

  clickSurvey: function () {
    var url = AuthStore.currentUser().formURL;
    var win = window.open(url, '_blank');
    win.focus();
  },

  makeDailySurveyButton: function () {
    if (AuthStore.currentUser().formURL == 'none') {
      return (
        <div className="ui disabled blue button">Fill out daily survey</div>
      );
    } else {
      return (
        <div className="ui blue button" onClick={this.clickSurvey}>Fill out daily survey</div>
      );
    }
  },

  makeDashboard: function () {
    if (AuthStore.isSignedIn()) {
      return (
        <div>
          {this.makeDailySurveyButton()}
          <h1 className="ui left aligned header">Your Data Streams</h1>
          <DataStreamIndex />
          <h1 className="ui header">Your Insights</h1>
          <InsightIndex />
          <h1 className="ui header">Your Data Visualizations (coming soon)</h1>
          <DataVisualizationIndex />
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
