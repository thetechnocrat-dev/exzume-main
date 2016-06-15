var React = require('react');
var AuthStore = require('../stores/authStore');

// components
var InsightItem = require('./insightItem');

var InsightIndex = React.createClass({
  getInitialState: function () {
    return ({ areMoreInsights: true, insights: [], startIndex: 0 });
  },

  _onChange: function () {
    // if user session become active get insights
    if (AuthStore.isSignedIn()) {
      this.clickMoreInsights();
    };
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);

    if (AuthStore.isSignedIn()) {
      this.clickMoreInsights();
    }
  },

  componentWillUnmount: function () {
    this.authToken.remove();
  },

  clickMoreInsights: function () {
    var CHUNK_SIZE = 10;
    var moreInsights = AuthStore.getInsights(this.state.startIndex, CHUNK_SIZE);
    this.setState({ startIndex: this.state.startIndex + CHUNK_SIZE });

    // makes it so user can not request more insights after all insights are already displayed
    if (moreInsights.length < CHUNK_SIZE) {
      this.setState({ areMoreInsights: false });
    }

    this.setState({ insights: this.state.insights.concat(moreInsights) });
  },

  makeInsights: function () {
    return this.state.insights.map(function (insight, idx) {
      return (
        <InsightItem
          key={idx}
          time={insight.date}
          message={insight.message}
          id={insight._id}
          username = {AuthStore.currentUser().local.username}
        />
      );
    });
  },

  makeDownIcon: function () {
    if (this.state.areMoreInsights) {
      var downArrowStyle = { cursor: 'pointer' };
      return (
        <div className="ui centered grid">
          <div className="centered row">
            <i
              className="large grey angle down icon"
              style={downArrowStyle}
              onClick={this.clickMoreInsights}
            />
          </div>
        </div>
      );
    }
  },

  render: function () {
    return (
      <div>
        <div className="ui relaxed divided centered list">
          {this.makeInsights()}
        </div>
        {this.makeDownIcon()}
      </div>
    );
  },

});

module.exports = InsightIndex;
