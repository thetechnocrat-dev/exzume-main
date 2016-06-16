var React = require('react');
var SessionStore = require('../stores/sessionStore');
var PropTypes = React.PropTypes;
var History = require('react-router').History;

var DataStreamDetail = React.createClass({
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
                Google Form Details
              </div>
              <p><b>description: </b> daily survey designed to get efficent data to find insights</p>
              <p><b>google form url: </b>{this.state.user.formURL}</p>
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

module.exports = DataStreamDetail;
