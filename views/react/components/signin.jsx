var React = require('react');
var AuthActions = require('../actions/authActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

// components

var SignIn = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { errors: '', };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ errors: '' });

    var signInParams = {
      username: this.state.username,
      password: this.state.password,
    };

    AuthActions.signIn(signInParams, this.successCallback, this.errorCallback);
  },

  errorCallback: function (errorMessage) {
    console.log(errorMessage);
    this.setState({ errors: errorMessage });
  },

  successCallback: function () {
    this.history.push('/dashboard');
  },

  makeErrors: function () {
    if (this.state.errors !== '') {
      return (
        <div className="ui red message">{this.state.errors}</div>
      );
    }
  },

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <form className="ui form">
          <h2 className="ui header">Sign In</h2>
          {this.makeErrors()}
          <div className="required field">
            <label>username</label>
            <input
              type="text"
              name="username"
              placeholder=""
              valueLink={this.linkState('username')}
            ></input>
          </div>

          <div className="required field">
            <label>password</label>
            <input
              type="text"
              name="password"
              placeholder=""
              valueLink={this.linkState('password')}
            ></input>
          </div>

          <div className="ui teal button" type="submit" onClick={this.handleSubmit}>Submit</div>
        </form>
      </div>
    );
  },

});

module.exports = SignIn;
