var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var History = require('react-router').History;
var Style = require('../../util/style');

var Signup = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
      { errors: '', username: '', password: '', email: '', confirmPassword: '', loading: false }
    );
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ errors: '' });

    if (this.state.password != this.state.confirmPassword) {
      this.setState({ errors: 'passwords do not match' });
    } else if (this.state.username === '') {
      this.setState({ errors: 'username is required' });
    } else if (this.state.password === '') {
      this.setState({ errors: 'password is required' });
    } else if (this.state.email === '') {
      this.setState({ errors: 'email is required' });
    } else {
      var signUpBody = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      };

      // will remain in loading state until AJAX callback changes state
      this.setState({ loading: true });
      FastFlux.webCycle('post', '/signup', {
        body: signUpBody,
        success: this.successCallback,
        error: this.errorCallback,
      });
    }
  },

  successCallback: function () {
    this.history.push('/dashboard');
  },

  errorCallback: function (error) {
    this.setState({ loading: false, errors: error.responseText });
  },

  makeErrors: function () {
    if (this.state.errors !== '') {
      return (
        <div className="ui red message">{this.state.errors}</div>
      );
    }
  },

  makeSubmitButton: function () {
    if (this.state.loading) {
      return (
        <div
          className="ui green disabled loading button"
          type="submit">Submit
        </div>
      );
    } else {
      return (
        <div className="ui green button" type="submit" onClick={this.handleSubmit}>Submit</div>
      );
    }
  },

  clickHomeLink: function () {
    this.history.push('/');
  },

  clickSignInLink: function () {
    this.history.push('/signin');
  },

  render: function () {
    var containerStyle = { margin: '10%' };
    var linkStyle = { cursor: 'pointer', color: Style.green };

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
              type="password"
              name="password"
              placeholder=""
              valueLink={this.linkState('password')}
            ></input>
          </div>

          <div className="required field">
            <label>confirm password</label>
            <input
              type="password"
              name="confirm password"
              placeholder=""
              valueLink={this.linkState('confirmPassword')}
            ></input>
          </div>

          <p>Already have an account? Then use
            the <a style={linkStyle} onClick={this.clickSignInLink}>Sign In</a> form
            or go back to the <a style={linkStyle} onClick={this.clickHomeLink}>Home Page</a>.
          </p>

          {this.makeSubmitButton()}
        </form>
      </div>
    );
  },

});

module.exports = Signup;
