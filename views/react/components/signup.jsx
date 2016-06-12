var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthActions = require('../actions/authActions');
var History = require('react-router').History;

var Signup = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { errors: '', };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ errors: '' });

    if (this.state.password != this.state.confirmPassword) {
      this.setState({ errors: 'passwords do not match' });
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

  errorCallback: function (errors) {
    console.log(errors);

    // this.setState({ errors: JSON.parse(errors) });
  },

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <form className="ui form">
          <h2 className="ui header">Sign Up</h2>
          <p>{this.state.errors}</p>

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
