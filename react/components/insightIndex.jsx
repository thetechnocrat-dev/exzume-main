var React = require('react');

// components
var InsightItem = require('./insightItem');

var InsightIndex = React.createClass({

  render: function () {
    return (
      <div>
        <h1 className="ui header">Your Insights</h1>
          <div className="ui relaxed divided centered list">
            <InsightItem time="22 minutes ago" message="Your data shows that running is highly correlated with increased happiness" />
            <InsightItem time="12 hours ago" message="Your stress is higher than normal. In the past socializing with close friends/family has decreased your stress, while getting less sleep has increased your stress" />
            <InsightItem time="1 day ago" message="Good job! You have exercised three days in the last week and our data shows that for many users similiar to yourself that reguluar exercise increses producivity and decreases stress" />
            <InsightItem time="3 days ago" message="Looking for a book to read? Our data shows that many users similiar to you have had an improvement in satisfaction after reading The Alchemist by Paulo Coelho" />
            <InsightItem time="3 days ago" message="You have answered your survey 21 days in row! Keep up the good work!" />
            <InsightItem time="4 days ago" message="Your data shows that consuming caffeine has a slight negative effect on your productivity" />
          </div>
          <div className="ui centered grid">
            <div className="centered row">
              <i className="large angle down icon" />
            </div>
          </div>
      </div>
    );
  },

});

module.exports = InsightIndex;
