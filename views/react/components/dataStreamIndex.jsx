var React = require('react');
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/sessionStore');

// components
var DataStreamItem = require('./dataStreamItem');

var DataStreamIndex = React.createClass({
  clickFitbit: function () {
    var fitbitParams = { username: SessionStore.currentUser().local.username, };

    // should put the fitbit url call as a callback incas
    SessionActions.addFitbit(fitbitParams, this.fitbitSuccess, this.fitbitError);
  },

  fitbitError: function () {
    console.log('fitbit error');
  },

  fitbitSuccess: function () {
    var url = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=227TQM&redirect_uri=http%3A%2F%2Fwww.exzume.com%2Fapi%2Ffitbit%2F&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight';
    var win = window.open(url, '_blank');
    win.focus();
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
