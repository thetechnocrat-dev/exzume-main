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

  getInitialState: function () {
    return ({ shouldShowWatson: false, clickCount: 0 });
  },

  clickRedButton: function () {
    this.setState({ shouldShowWatson: !(this.state.shouldShowWatson), clickCount: this.state.clickCount + 1 });
  },

  justForAlan: function () {
    if (this.state.clickCount > 1) {
      return ('');
    } else if (this.state.shouldShowWatson) {
      return (
        <div>
          <div className="ui circular green button" onClick={this.clickRedButton}>Do Click</div>
          <div className="ui large image">
            <img src={'http://www.imgjunk.com/wp-content/uploads/2015/05/Emma-Watson-Looking-Glamorous.jpg'} />
            <h1 className="ui header">told you the UI would get you hard ;)</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui circular red button" onClick={this.clickRedButton}>Do Not Click</div>
      );
    }
  },

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
        {this.justForAlan()}
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
