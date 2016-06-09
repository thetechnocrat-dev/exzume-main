var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthActions = require('../actions/authActions');

// components
var TextQuestion = require('./form/textQuestion');

var SignUp = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { username: '', password: '', errors: '', password: '', confirmPassword: '', };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ errors: '' });
    console.log('password', this.state.password);
    console.log('confirm', this.state.confirmPassword);

    if (this.state.password != this.state.confirmPassword) {
      this.setState({ errors: 'passwords do not match' });
    } else {
      var signupParams = { user: this.state };
      AuthActions.signUp(signupParams, this.errorCallback);
    }
  },

  errorCallback: function (errors) {
    this.setState({ errors: JSON.parse(errors) });
  },

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <form className="ui form">
          <h2 className="ui header">Sign Up</h2>
          <p>{this.state.errors}</p>
          <TextQuestion
            label="username"
            name="username"
            placeholder="username"
            valueLink={this.linkState('username')}
          />

          <TextQuestion
            label="password"
            name="password"
            placeholder="password"
            valueLink={this.linkState('password')}
          />

          <TextQuestion
            label="confirm password"
            name="confirm password"
            placeholder="password"
            valueLink={this.linkState('confirmPassword')}
          />

        <div className="ui button" type="submit" onClick={this.handleSubmit}>Submit</div>
        </form>
      </div>
    );
  },

});

module.exports = SignUp;
