var React = require('react');
var AuthStore = require('../stores/authStore');
var Navbar = require('./navbar');
var History = require('react-router').History;

var Profile = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({ user: AuthStore.currentUser() });
  },

  clickBack: function () {
    this.history.push('/dashboard');
  },

  render: function () {
    var centerContainerStyle = { margin: '20%' };
    return (
      <div className="ui container" style={centerContainerStyle}>
        <div className="ui one column left aligned relaxed grid container">
          <div className="row">
            <div className="ui message">
              <div className="header">
                Profile
              </div>
              <p><b>username: </b>{this.state.user.local.username}</p>
              <p><b>email: </b>{this.state.user.local.email}</p>
              <p><b>google form url: </b>{this.state.user.formURL}</p>
              <p><b># of insights: </b>{this.state.user.insights.length}</p>
            </div>
          </div>
          <div className="row">
            <div className="ui teal button" onClick={this.clickBack}>Back</div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Profile;
