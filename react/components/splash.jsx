var React = require('react');
var History = require('react-router').History;

var App = React.createClass({
  mixins: [History],

  clickAbout: function () {
    this.history.push('/about');
  },

  clickSampleAccount: function (event) {
    this.history.push('/dashboard');
  },

  render: function () {
    var centerContainerStyle = { marginTop: '20%' };

    return (
      <div className="ui one column center aligned grid container" style={centerContainerStyle}>
        <div className="row">
          <h1 className="ui header">exzume</h1>
        </div>
        <div className="row">
          <div className="ui button" onClick={this.clickAbout}>about</div>
          <div className="ui button" onClick={this.clickSampleAccount}>sample account</div>
        </div>
      </div>
    );
  },

});

module.exports = App;
