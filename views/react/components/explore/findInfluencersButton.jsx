var React = require('react');
var GraphStore = require('../../stores/graphStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var FindInfluencersButton = React.createClass({
  propTypes: {
    feature: React.PropTypes.array.isRequired,
  },

  render: function () {
    return (
      <div className="ui green button">Find Influencers</div>
    );
  },
});

module.exports = FindInfluencersButton;

