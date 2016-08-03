var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var History = require('react-router').History;
var Style = require('../../util/style');

var Signup = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
      { errors: [], username: '', password: '', email: '', confirmPassword: '', loading: false }
    );
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var errors = [];

    if (this.state.password != this.state.confirmPassword) errors.push('passwords do not match');
    if (this.state.username === '') errors.push('username is required');
    if (this.state.password === '') errors.push('password is required');
    if (this.state.email === '') errors.push('email is required');

    if (errors.length > 0) {
      this.setState({ errors: errors });
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
    this.setState({ loading: false, errors: [error.responseText] });
  },

  makeErrors: function () {
    if (this.state.errors.length > 0) {
      return (
        <div className="ui error message">
          <ul className="list">
            {this.state.errors.map(function (error, idx) {
              return <li key={idx}>{error}</li>;
            }
          )}
          </ul>
        </div>
      );
    }
  },

  makeSubmitButton: function () {
    if (this.state.loading) {
      return (
        <div
          className="ui green disabled loading fluid large button"
          type="submit">Sign Up
        </div>
      );
    } else {
      return (
        <div
          className="ui green fluid large button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Sign Up
        </div>
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
    var containerStyle = { marginTop: '20%' };
    var linkStyle = { cursor: 'pointer', color: Style.green };
    var formStyle = { backgroundColor: 'white' };
    var columnStyle = { maxWidth: '450px', width: '100%' };

    return (
      <div className="ui middle aligned center aligned grid" style={containerStyle}>
				<div className="column" style={columnStyle}>
          <h2 className="ui green header">Create your account</h2>
          <form className="ui large form" style={formStyle}>
            <div className="ui stacked segment">

              <div className="field">
                <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      valueLink={this.linkState('username')}
                    />
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                    <i className="browser icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      valueLink={this.linkState('email')}
                    />
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    valueLink={this.linkState('password')}
                  />
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="confirm password"
                    placeholder="Confirm password"
                    valueLink={this.linkState('confirmPassword')}
                  />
                </div>
              </div>

              {this.makeSubmitButton()}
            </div>
          </form>

          {this.makeErrors()}

          <div className="ui message">
            Already have an account? Then &nbsp;
            <a
              style={linkStyle}
              onClick={this.clickSignInLink}
            >
              Sign In
            </a>
          </div>
				</div>
			</div>
    );
  },

});

module.exports = Signup;
