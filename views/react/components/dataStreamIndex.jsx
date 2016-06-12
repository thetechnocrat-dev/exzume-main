var React = require('react');

// components
var DataStreamItem = require('./dataStreamItem');

var DataStreamIndex = React.createClass({

  render: function () {
    return (
      <div className='ui left aligned grid'>
        <div className="doubling eight column row">
          <div className="column">
            <button className="ui disabled teal icon button">
              <i className="large plus icon"></i>
            </button>
          </div>
          <DataStreamItem icon="blue google" label="Google Form" />
        </div>
      </div>
    );
  },

});

module.exports = DataStreamIndex;
