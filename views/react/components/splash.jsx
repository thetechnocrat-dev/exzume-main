var React = require('react');
var History = require('react-router').History;

var App = React.createClass({
  mixins: [History],

  clickAbout: function () {
    this.history.push('/about');
  },

  clickSampleAccount: function () {
    this.history.push('/dashboard');
  },

  clickSignIn: function () {
    this.history.push('/signin');
  },

  clickSignUp: function () {
    this.history.push('/signup');
  },

  render: function () {
    var centerContainerStyle = { margin: '20%' };

    return (
      <div className="ui one column center aligned grid container" style={centerContainerStyle}>
        <div className="row">
          <h1 className="ui header">exzume</h1>
        </div>
        <div className="row">
          <div className="ui button" onClick={this.clickAbout}>about</div>
          <div className="ui button" onClick={this.clickSignIn}>sign in</div>
          <div className="ui button" onClick={this.clickSignUp}>sign up</div>
        </div>
      </div>
    );
  },

});

module.exports = App;
