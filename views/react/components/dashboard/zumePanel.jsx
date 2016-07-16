var React = require('react');
var PropTypes = React.PropTypes;

var ZumePanel = React.createClass({

  render: function () {
    return (
      <div className="row">
        <div className="three wide column">
          <img></img>
        </div>
        <div className="ten wide column">
          <p></p>
        </div>
        <div className="three wide column">
          <img></img>
        </div>
      </div>
    );
  },

});

module.exports = ZumePanel;
