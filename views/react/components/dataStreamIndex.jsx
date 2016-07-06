var React = require('react');
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/sessionStore');

// components
var DataStreamItem = require('./dataStreamItem');

var DataStreamIndex = React.createClass({
  clickFitbit: function () {
    var fitbitParams = { username: SessionStore.currentUser().local.username, };

    SessionActions.addFitbit(fitbitParams, this.fitbitSuccess, this.fitbitError);
  },

  fitbitError: function () {
    console.log('fitbit error');
  },

  fitbitSuccess: function () {

  },

  render: function () {
    return (
      <div className='ui left aligned grid'>
        <div className="doubling eight column row">
          <div className="column">
            <div className="ui simple dropdown">
              <button className="ui teal icon button">
                <i className="large plus icon"></i>
              </button>
              <div className="menu">
                <div className="item" onClick={this.clickFitbit}>Fitbit</div>
              </div>
            </div>
          </div>
          <DataStreamItem icon="blue google" label="Google Form" />
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
