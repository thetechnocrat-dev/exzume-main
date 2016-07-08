var React = require('react');
var History = require('react-router').History;
var DataStreamIndex = require('./dataStreamIndex');
var InsightIndex = require('./insightIndex');
var DataVisIndex = require('./dataVisIndex');
var SessionStore = require('../stores/sessionStore');

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

  makeDailySurveyButton: function () {
    var buttonFontStyle = { color: '#F6FBFC', };
    if (SessionStore.currentUser().formURL == 'none') {
      return (
        <div className="ui yellow button"
          style={buttonFontStyle}
          data-tooltip="Your custom survey will be linked to your account soon!"
          data-position="bottom left"
        >
          Fill out daily survey
        </div>
      );
    } else {
      return (
        <div style={buttonFontStyle} className="ui yellow button" onClick={this.clickSurvey}>Fill out daily survey</div>
      );
    }
  },

  makeDashboard: function () {
    if (SessionStore.isSignedIn()) {
      return (
        <div>
          {this.makeDailySurveyButton()}
          <h1 className="ui left aligned header">Your Data Streams</h1>
          <DataStreamIndex />
          <h1 className="ui header">Your Insights</h1>
          <InsightIndex />
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
