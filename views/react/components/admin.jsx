var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionActions = require('../actions/sessionActions');
var History = require('react-router').History;

var Admin = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return ({ formUrlErrors: '', formUrlMessages: '', insightErrors: '', insightMessages: '' });
  },

  clickHome: function () {
    this.history.push('/');
  },

  handleAddFormUrlSubmit: function (event) {
    event.preventDefault();
    this.setState({ formUrlErrors: '', formUrlMessages: '' }); // clear messages from last submit

    var params = {
      username: this.state.username,
      link: this.state.link,
    };

    SessionActions.addFormUrl(params, this.successFormUrlCallback, this.errorFormUrlCallback);
  },

  successFormUrlCallback: function (respData) {
    console.log('user add form URL success', respData);
    this.setState({ formUrlMessages: respData.message });
  },

  errorFormUrlCallback: function () {
    console.log('user add form URL error');
    this.setState({ formUrlErrors: 'something went wrong =(' });
  },

  handleAddInsightSubmit: function (event) {
    console.log('submit hit');
    event.preventDefault();
    this.setState({ insightErrors: '', insightMessages: '' });

    var params = {
      username: this.state.username,
      message: this.state.insightMessage,
    };

    SessionActions.addInsight(params, this.successInsightCallback, this.errorInsightCallback);
  },

  successInsightCallback: function (respData) {
    console.log('user add insight success');
    this.setState({ insightMessages: respData.message });
  },

  errorInsightCallback: function () {
    console.log('user add form URL error');
    this.setState({ insightErrors: 'something went wrong =(' });
  },

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <form className="ui form">
          <h2 className="ui header">Add Google Form to User Account</h2>
          <p>{this.state.formUrlErrors}</p>
          <p>{this.state.formUrlMessages}</p>

          <div className="required field">
            <label>user</label>
            <input
              type="text"
              name="username"
              placeholder=""
              valueLink={this.linkState('username')}
            ></input>
          </div>

          <div className="required field">
            <label>google form link</label>
            <input
              type="text"
              name="link"
              placeholder=""
              valueLink={this.linkState('link')}
            ></input>
          </div>

        <div className="ui teal button" type="submit" onClick={this.handleAddFormUrlSubmit}>Submit</div>
        </form>

        <div className="ui horizontal divider">or</div>

        <form className="ui form">
          <h2 className="ui header">Add Google Insight to User Account</h2>
            <p>{this.state.insightErrors}</p>
            <p>{this.state.insightMessages}</p>
          <p>{this.state.errors}</p>
          <p>{this.state.messages}</p>

          <div className="required field">
            <label>user</label>
            <input
              type="text"
              name="username"
              placeholder=""
              valueLink={this.linkState('username')}
            ></input>
          </div>

          <div className="required field">
            <label>insight message</label>
            <input
              type="text"
              name="insightMessage"
              placeholder=""
              valueLink={this.linkState('insightMessage')}
            ></input>
          </div>

        <div className="ui teal button" type="submit" onClick={this.handleAddInsightSubmit}>Submit</div>
        </form>

        <div className="ui horizontal divider">or</div>

        <div className="ui teal button" onClick={this.clickHome}>Go Home</div>
      </div>
    );
  },

});

module.exports = Admin;
