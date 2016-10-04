var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var History = require('react-router').History;
var Style = require('../../util/style');

var BetaSignUp = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
      { email: '', confirmEmail: '', name: '', whyText: '', errors: [], success: null }
    );
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var errors = [];

    if (this.state.email != this.state.confirmEmail) errors.push('emails do not match');
    if (this.state.email === '') errors.push('email is required');
    if (this.state.confirmEmail === '') errors.push('confirm email is required');

    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      var body = {
        name: this.state.name,
        email: this.state.email,
        whyText: this.state.whyText,
      };

      // will remain in loading state until AJAX callback changes state
      this.setState({ loading: true });
      FastFlux.webCycle('post', '/beta', {
        body: body,
        success: this.successCallback,
        error: this.errorCallback,
      });
    }
  },

  successCallback: function () {
    this.setState({ errors: [], loading: false, success: true });
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
          type="submit">Submit
        </div>
      );
    } else {
      return (
        <div
          className="ui green fluid large button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit
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

  makeContent: function () {
    if (this.state.success) {
      return (
        <div className="ui raised segment">
          <h5 className="ui black header">
            Thank you! We will email you when beta access opens up.
          </h5>
        </div>
      );
    } else {
      var formStyle = { backgroundColor: 'white' };
      return (
        <form className="ui large form" style={formStyle}>
          <div className="ui raised segment">

            <div className="field">
              <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    valueLink={this.linkState('name')}
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
                <i className="browser icon" />
                <input
                  type="text"
                  name="confirm email"
                  placeholder="Confirm Email"
                  valueLink={this.linkState('confirmEmail')}
                />
              </div>
            </div>

            <div className="field">
              <textarea
                rows="3"
                placeholder={'Optional - Just curious about  why you are interested in trying' +
                ' Exzume. =)'}
                valueLink={this.linkState('whyText')} />
            </div>

            {this.makeSubmitButton()}
          </div>
        </form>
      );
    }
  },

  render: function () {
    var containerStyle = { paddingTop: '15%' };
    var linkStyle = { cursor: 'pointer', color: Style.green };
    var columnStyle = { maxWidth: '450px', width: '100%' };

    return (
      <div className="ui middle aligned center aligned grid" style={containerStyle}>
	  	<div className="column" style={columnStyle}>
          <h2 className="ui green header">Request Exzume Beta Access</h2>

          {this.makeContent()}
          
          {this.makeErrors()}

          <div className="ui message">
            Already have an account? Then &nbsp;
            <a
              style={linkStyle}
              onClick={this.clickSignInLink}
            >
              Sign In
            </a>
            &nbsp; or go to the &nbsp;
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

module.exports = BetaSignUp;
