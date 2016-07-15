var React = require('react');
var PropTypes = React.PropTypes;

var ZumePanel = React.createClass({

  render: function () {
    return (
      <div class="row">
        <div class="three wide column">
          <img></img>
        </div>
        <div class="ten wide column">
          <p></p>
        </div>
        <div class="three wide column">
          <img></img>
        </div>
      </div>
    );
  },

});

module.exports = ZumePanel;
