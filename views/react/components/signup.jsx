var React = require('react');

// components
var TextQuestion = require('./form/textQuestion');

var Signup = React.createClass({

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <form className="ui form">
          <h2 className="ui header">Sign Up</h2>
          <TextQuestion
            label="username"
            name="username"
            placeholder="username"
          />

          <TextQuestion
            label="email"
            name="email"
            placeholder="name@email.com"
          />

          <TextQuestion
            label="password"
            name="password"
            placeholder="password"
          />

          <TextQuestion
            label="confirm password"
            name="confirm password"
            placeholder="password"
          />
        </form>
      </div>
    );
  },

});

module.exports = Signup;
