var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// components
var Zume = require('./zume');

var ZumePanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  makeZumes: function () {
    var zumes = this.props.user.zumes;
    var _this = this;
    return zumes.map(function (zume, idx) {
      return <Zume key={idx} zume={zume} user={_this.props.user} />;
    });
  },

  render: function () {
    return (
      <div>
        {this.makeZumes()}
      </div>
    );
  },

});

module.exports = ZumePanel;
