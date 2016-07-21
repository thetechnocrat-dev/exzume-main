var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ZumePanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  makeZumes: function () {
    var zumes = this.props.user.zumes;
  },

  render: function () {
    return (
      <div>
      </div>
    );
  },

});

module.exports = ZumePanel;
