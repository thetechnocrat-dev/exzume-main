var React = require('react');

var DataStreamItem = React.createClass({
  // getInitialState: function () {
  //   var initialState = { isLoading: false };
  //   return initialState;
  // },
  //
  // clickSync: function (event) {
  //   event.preventDefault();
  //
  //
  // }

  render: function () {
    return (
      <div className="ui segment">
        <a className="ui small image" href={this.props.streamDataURL}>
          <img src={this.props.streamImage}/>
        </a>
      </div>
    );
  },

});

module.exports = DataStreamItem;
