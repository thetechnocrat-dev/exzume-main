var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthActions = require('../actions/authActions');
var History = require('react-router').History;

var Signup = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { errors: '', username: '', password: '', email: '', confirmPassword: '' };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ errors: '' });
    console.log('here');
    if (this.state.password != this.state.confirmPassword) {
      this.setState({ errors: 'passwords do not match' });
    } else if (this.state.username === '') {
      this.setState({ errors: 'username is required' });
    } else if (this.state.password === '') {
      this.setState({ errors: 'password is required' });
    } else if (this.state.email === '') {
      this.setState({ errors: 'email is required' });
    } else {
      var signUpParams = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      };
      AuthActions.signUp(signUpParams, this.successCallback, this.errorCallback);
    }
  },

  successCallback: function () {
    this.history.push('/dashboard');
  },

  errorCallback: function (errorMessage) {
    console.log(errorMessage);
    this.setState({ errors: errorMessage });
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
          <h2 className="ui header">Sign Up</h2>
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
            <label>email</label>
            <input
              type="text"
              name="email"
              placeholder=""
              valueLink={this.linkState('email')}
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

          <div className="required field">
            <label>confirm password</label>
            <input
              type="text"
              name="confirm password"
              placeholder=""
              valueLink={this.linkState('confirmPassword')}
            ></input>
          </div>

        <div className="ui teal button" type="submit" onClick={this.handleSubmit}>Submit</div>
        </form>
      </div>
    );
  },

});

module.exports = Signup;
