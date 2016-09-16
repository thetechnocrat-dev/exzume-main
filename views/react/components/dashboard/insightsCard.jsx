var React = require('react');

// Components

var InsightCard = React.createClass({
  propTypes: {
    insights: React.PropTypes.array.isRequired,
  },

  componentDidMount: function () {
    console.log('insihgt card');
  },

  render: function () {
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header">
            Insights
          </div>
        </div>
      </div>
    );
  },

});

module.exports = InsightCard;

