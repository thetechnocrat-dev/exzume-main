var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ResetPassword = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({
      password: '',
      confirmPassword: '',
      successMessage: null,
      errorMessage: null,
      loading: false,
    });
  },

  success: function (resp) {
    this.setState({ successMessage: resp.responseText, loading: false, errorMessage: null });
  },

  error: function (resp) {
    console.log(resp);
    this.setState({ errorMessage: resp.responseText, loading: false });
  },

  handleSubmit: function (event) {
    event.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: 'Passwords do not match' });
    } else {
      this.setState({ loading: true });
      FastFlux.webCycle('post', '/reset-password', {
        body: {
          username: this.props.params.username,
          token: this.props.params.token,
          password: this.state.password,
        },
        success: this.success,
        error: this.error,
      });
    }
  },

  makeSubmitButton: function () {
    if (this.state.loading) {
      return (
        <div
          className="ui green disabled loading fluid large button"
          type="submit">Reset Password
        </div>
      );
    } else {
      return (
        <div
          className="ui green fluid large button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Reset Password
        </div>
      );
    }
  },

  makeErrorMessage: function () {
    if (this.state.errorMessage) {
      return (
        <div className="ui error message">
          {this.state.errorMessage}
        </div>
      );
    }
  },

  makeContent: function () {
    if (this.state.successMessage) {
      return (<h5 className="ui black header">{this.state.successMessage}</h5>);
    } else {
      var formStyle = { backgroundColor: 'white' };
      return (
        <form className="ui large form" style={formStyle}>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon" />
              <input
                type="password"
                name="password"
                placeholder="password"
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
                placeholder="confirm password"
                valueLink={this.linkState('confirmPassword')}
              />
            </div>
          </div> 
          {this.makeSubmitButton()}
        </form>
      );
    }
  },

  render: function () {
    var containerStyle = { paddingTop: '15%' };
    var columnStyle = { maxWidth: '450px', width: '100%' };

    return (
      <div className="ui middle aligned center aligned grid" style={containerStyle}>
	    <div className="column" style={columnStyle}>
          <h2 className="ui green header">exzume reset password</h2>
          <div className="ui raised segment">
            {this.makeContent()}  
          </div>
          {this.makeErrorMessage()}
        </div>
      </div>
    );
  },

});

module.exports = ResetPassword;

