var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthActions = require('../actions/authActions');

var Admin = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({ errors: '', messages: '' });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ errors: '', messages: '' }); // clear messages from last submit

    var putParams = {
      username: this.state.username,
      link: this.state.link,
    };

    AuthActions.update(putParams, this.successCallback, this.errorCallback);
  },

  successCallback: function (respData) {
    console.log('user update success', respData);
    this.setState({ messages: respData.message });
  },

  errorCallback: function () {
    console.log('user update error');
  },

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <form className="ui form">
          <h2 className="ui header">Add Google Form to Account</h2>
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
            <label>google form link</label>
            <input
              type="text"
              name="link"
              placeholder=""
              valueLink={this.linkState('link')}
            ></input>
          </div>

        <div className="ui button" type="submit" onClick={this.handleSubmit}>Submit</div>
        </form>
      </div>
    );
  },

});

module.exports = Admin;
