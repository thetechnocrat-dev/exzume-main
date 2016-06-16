var React = require('react');
var SessionStore = require('../stores/sessionStore');
var Navbar = require('./navbar');
var History = require('react-router').History;

var Profile = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({ user: SessionStore.currentUser() });
  },

  clickBack: function () {
    this.history.push('/dashboard');
  },

  render: function () {
    return (
      <div className="ui container" >
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
