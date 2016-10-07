var React = require('react');

// Components
var ZumeItem = require('./zumeItem');

var InsightList = React.createClass({
  propTypes: {
    zumes: React.PropTypes.array.isRequired,
  },

  makeInsightItems: function () {
    var _this = this;
    return this.props.zumes.map(function (zume, idx) {
      return (<ZumeItem key={idx} zume={zume} />);
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

