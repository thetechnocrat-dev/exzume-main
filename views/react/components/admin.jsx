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

  handleCorrSubmit: function (event) {
    event.preventDefault();
    this.setState({ corrErrors: '', corrMessages: '' });

    var params = {
      username: this.state.username4,
      xVar: this.state.xVar,
      yVar: this.state.yVar,
    };

    SessionActions.addCorr(params, this.successCorrCallback, this.errorCorrCallback);
  },

  successCorrCallback: function (respData) {
    this.setState({ corrMessages: respData.message });
  },

  errorCorrCallback: function (respError) {
    this.setState({ corrErrors: respError });
  },

  handleAddFitbitData: function (event) {
    console.log('here');
    event.preventDefault();
    this.setState({ fitbitErrors: '', fitbitMessages: '' });

    var params = {
      username: this.state.username5,
    };

    SessionActions.addFitbitData(params, this.successFitbitCallback, this.errorFitbitCallback);
  },

  successFitbitCallback: function (respData) {
    this.setState({ fitbitMessages: respData.message });
  },

  errorFitbitCallback: function (respError) {
    this.setState({ fitbitErrors: respError });
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

        <div className="ui green button" type="submit" onClick={this.handleAddFormUrlSubmit}>Submit</div>
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

        <div className="ui green button" type="submit" onClick={this.handleAddInsightSubmit}>Submit</div>
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

        <div className="ui green button" type="submit" onClick={this.handleAddVisSubmit}>Submit</div>
        </form>

        <div className="ui horizontal divider">or</div>

        <form className="ui form">
          <h2 className="ui header">Add Correlation to User Account</h2>
          <p>{this.state.corrErrors}</p>
          <p>{this.state.corrMessages}</p>

          <div className="required field">
            <label>username</label>
            <input
              type="text"
              name="username4"
              placeholder=""
              valueLink={this.linkState('username4')}
            ></input>
          </div>

          <div className="required field">
            <label>x variable</label>
            <input
              type="text"
              name="xVar"
              placeholder=""
              valueLink={this.linkState('xVar')}
            ></input>
          </div>

          <div className="required field">
            <label>y variable</label>
            <input
              type="text"
              name="yVar"
              placeholder=""
              valueLink={this.linkState('yVar')}
            ></input>
          </div>

        <div className="ui green button" type="submit" onClick={this.handleCorrSubmit}>Submit</div>
        </form>

        <div className="ui horizontal divider">or</div>

          <form className="ui form">
            <h2 className="ui header">Put Fitbit Data into User's Fitbit DataStream</h2>
            <p>{this.state.visErrors}</p>
            <p>{this.state.visMessages}</p>

            <div className="required field">
              <label>username</label>
              <input
                type="text"
                name="username5"
                placeholder=""
                valueLink={this.linkState('username5')}
              ></input>
            </div>

          <div className="ui green button" type="submit" onClick={this.handleAddFitbitData}>Submit</div>
          </form>

          <div className="ui horizontal divider">or</div>

        <div className="ui green button" onClick={this.clickHome}>Go Home</div>
      </div>
    );
  },

});

module.exports = Admin;
