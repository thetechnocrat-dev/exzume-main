var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionActions = require('../actions/sessionActions');
var History = require('react-router').History;

var Admin = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return ({ formUrlErrors: '', formUrlMessages: '',
              insightErrors: '', insightMessages: '',
              visErrors: '', visMessages: '', });
  },

  clickHome: function () {
    this.history.push('/');
  },

  handleAddFormUrlSubmit: function (event) {
    event.preventDefault();
    this.setState({ formUrlErrors: '', formUrlMessages: '' }); // clear messages from last submit

    var params = {
      username: this.state.username1,
      link: this.state.formLink,
    };

    SessionActions.addFormUrl(params, this.successFormUrlCallback, this.errorFormUrlCallback);
  },

  successFormUrlCallback: function (respData) {
    this.setState({ formUrlMessages: respData.message });
  },

  errorFormUrlCallback: function (respError) {
    this.setState({ formUrlErrors: respError });
  },

  handleAddInsightSubmit: function (event) {
    event.preventDefault();
    this.setState({ insightErrors: '', insightMessages: '' });

    var params = {
      username: this.state.username2,
      message: this.state.insightMessage,
    };

    SessionActions.addInsight(params, this.successInsightCallback, this.errorInsightCallback);
  },

  successInsightCallback: function (respData) {
    this.setState({ insightMessages: respData.message });
  },

  errorInsightCallback: function (respError) {
    this.setState({ insightErrors: respError });
  },

  handleAddVisSubmit: function(event) {
    event.preventDefault();
    this.setState({ visErrors: '', visMessages: '' });

    var params = {
      username: this.state.username3,
      link: this.state.visLink,
    };

    SessionActions.addVisUrl(params, this.successVisCallback, this.errorVisCallback);
  },

  successVisCallback: function (respData) {
    this.setState({ visMessages: respData.message });
  },

  errorVisCallback: function (respError) {
    this.setState({ visErrors: respError });
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
            <label>username</label>
            <input
              type="text"
              name="username1"
              placeholder=""
              valueLink={this.linkState('username1')}
            ></input>
          </div>

          <div className="required field">
            <label>google form link</label>
            <input
              type="text"
              name="formLink"
              placeholder=""
              valueLink={this.linkState('formLink')}
            ></input>
          </div>

        <div className="ui teal button" type="submit" onClick={this.handleAddFormUrlSubmit}>Submit</div>
        </form>

        <div className="ui horizontal divider">or</div>

        <form className="ui form">
          <h2 className="ui header">Add Insight to User Account</h2>
            <p>{this.state.insightErrors}</p>
            <p>{this.state.insightMessages}</p>
          <p>{this.state.errors}</p>
          <p>{this.state.messages}</p>

          <div className="required field">
            <label>username</label>
            <input
              type="text"
              name="username2"
              placeholder=""
              valueLink={this.linkState('username2')}
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

        <form className="ui form">
          <h2 className="ui header">Add Visualization to User Account</h2>
          <p>{this.state.visErrors}</p>
          <p>{this.state.visMessages}</p>

          <div className="required field">
            <label>username</label>
            <input
              type="text"
              name="username3"
              placeholder=""
              valueLink={this.linkState('username3')}
            ></input>
          </div>

          <div className="required field">
            <label>visualization link</label>
            <input
              type="text"
              name="visLink"
              placeholder=""
              valueLink={this.linkState('visLink')}
            ></input>
          </div>

        <div className="ui teal button" type="submit" onClick={this.handleAddVisSubmit}>Submit</div>
        </form>

        <div className="ui horizontal divider">or</div>

        <div className="ui teal button" onClick={this.clickHome}>Go Home</div>
      </div>
    );
  },

});

module.exports = Admin;
