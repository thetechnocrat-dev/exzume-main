var React = require('react');
var GraphStore = require('../../stores/graphStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var FindInfluencersButton = React.createClass({
  propTypes: {
    feature: React.PropTypes.array.isRequired,
  },

  handleClick: function () {
    FastFlux.cycle('GRAPH_TYPE_RECEIVED', 'bar');
  },

  render: function () {
    return (
      <div className="ui green button" onClick={this.handleClick}>Find Influencers</div>
    );
  },
});

module.exports = FindInfluencersButton;

