var React = require('react');

// components
var TextQuestion = require('./form/textQuestion');

var SignIn = React.createClass({

  render: function () {
    var containerStyle = { margin: '10%' };

    return (
      <div className="ui container" style={containerStyle}>
        <form className="ui form">
          <h2 className="ui header">Sign In</h2>
          <TextQuestion
            label="username"
            name="username"
            placeholder="username"
          />

          <TextQuestion
            label="password"
            name="password"
            placeholder="password"
          />
        </form>
      </div>
    );
  },

});

module.exports = SignIn;
