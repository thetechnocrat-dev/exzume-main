var React = require('react');

// Components
var InsightList = require('./insightList');

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
          <InsightList insights={this.props.insights} />
        </div>
      </div>
    );
  },

});

module.exports = InsightCard;

