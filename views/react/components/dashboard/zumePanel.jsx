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
      return (
        <div className="column" key={idx}>
          <Zume key={idx} zume={zume} user={_this.props.user} />
        </div>
      );
    });
  },

  render: function () {
    return (
      <div className="ui two column stackable grid">
        {this.makeZumes()}
      </div>
    );
  },

});

module.exports = ZumePanel;
