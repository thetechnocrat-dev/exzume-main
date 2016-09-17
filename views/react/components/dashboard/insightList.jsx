var React = require('react');

// Components

var InsightList = React.createClass({
  propTypes: {
    insights: React.PropTypes.array.isRequired,
  },

  componentDidMount: function () {
    console.log('insight list');
  },

  makeInsightItems: function () {
    return this.props.insights.map(function (insight, idx) {
      return (
        <div className="item" key={idx}>
          <i className="large check circle middle aligned icon" />
          <div className="content">
            <div className="header">{insight.text}</div> 
            <div className="description">{insight.info}</div>
          </div>
        </div>
      );
    });
  },

  render: function () {
    return (
      <div className="ui relaxed divided list">
        {this.makeInsightItems()}
      </div>
    );
  },

});

module.exports = InsightList;

