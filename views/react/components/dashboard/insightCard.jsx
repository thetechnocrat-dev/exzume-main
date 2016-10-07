var React = require('react');

// Components
var InsightList = require('./insightList');

var InsightCard = React.createClass({
  propTypes: {
    zumes: React.PropTypes.array.isRequired,
  },

  componentDidMount: function () {
    console.log('insihgt card');
  },

  render: function () {
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="header">
            Your Zumes
          </div>
          <InsightList zumes={this.props.zumes} />
        </div>
      </div>
    );
  },

});

module.exports = InsightCard;

