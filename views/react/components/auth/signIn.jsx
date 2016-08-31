var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var History = require('react-router').History;
var Style = require('../../util/style');

var SignIn = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { errors: [], username: '', password: '', loading: false };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var errors = [];

    if (this.state.username === '') errors.push('username required');
    if (this.state.password === '') errors.push('password required');

    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      var signInBody = {
        username: this.state.username,
        password: this.state.password,
      };

      // will remain in loading state until AJAX callback changes state
      this.setState({ loading: true });
      FastFlux.webCycle('post', '/signin', {
        body: signInBody,
        success: this.successCallback,
        error: this.errorCallback,
        shouldStoreReceive: true,
        storeActionType: 'SESSION_RECEIVED',
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
    var buttonStyle = { marginBottom: '2.5%' };

    if (this.state.loading) {
      return (
        <div
          style={buttonStyle}
          className="ui green disabled loading fluid large button"
          type="submit">Sign In
        </div>
      );
    } else {
      return (
        <div
          style={buttonStyle}
          className="ui green fluid large button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Sign In
        </div>
      );
    }
  },

  clickHomeLink: function () {
    this.history.push('/');
  },

  clickForgotPassword: function () {
    
  },

  clickSignUpLink: function () {
    this.history.push('/signup');
  },

  render: function () {
    var containerStyle = { paddingTop: '15%' };
    var linkStyle = { cursor: 'pointer', color: Style.green };
    var formStyle = { backgroundColor: 'white' };
    var columnStyle = { maxWidth: '450px', width: '100%' };

    return (
      <div className="ui middle aligned center aligned grid" style={containerStyle}>
				<div className="column" style={columnStyle}>
          <h2 className="ui green header">Sign in to your account</h2>
          <form className="ui large form" style={formStyle}>
            <div className="ui raised segment">

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
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    valueLink={this.linkState('password')}
                  />
                </div>
              </div>

              {this.makeSubmitButton()}
              <a
                style={linkStyle}
                onClick={this.clickForgotPassword}
              >
                Forgot Password?
              </a>
            </div>
          </form>

          {this.makeErrors()}

          <div className="ui message">
            New to us? Then request beta access on the &nbsp;
            <a
              style={linkStyle}
              onClick={this.clickHomeLink}
            >
              Home Page
            </a>
          </div>
				</div>
			</div>
    );
  },

});

module.exports = SignIn;
