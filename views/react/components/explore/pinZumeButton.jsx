var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');
var ExploreStore = require('../../stores/exploreStore');

var PinZumeButton = React.createClass({
  propTypes: {
    isDisabled: React.PropTypes.bool.isRequired,
  },

  getInitialState: function () {
    return { success: null, error: null };
  },

  successCallback: function (res) {
    this.setState({ success: true });
    console.log(res);
  },

  errorCallback: function (res) {
    console.log(res);
  },

  handleClick: function () {
    var body = {
      data: JSON.stringify(ExploreStore.getCorrelateScatterData()),
      correlateInfo: JSON.stringify(ExploreStore.getCorrelateScatterInfo()),
      message: 'Computer Productivity has a slight but confident positive correlation with time asleep',
    };

    FastFlux.webCycle('post', '/auth/zumes/new', {
      body: body,
      success: this.successCallback,
      error: this.errorCallback,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
    });
  },

  makeButton: function () {
    if (this.props.isDisabled) {
      return (
        <button
          className="ui basic disabled button"
        >
          Pin Zume
        </button>
      );
    } else if (this.state.success) {
      return (
        <button
          className="ui active green button"
          onClick={this.handleClick}
        >
          Zume Succesfully Pinned
        </button>
      );
    } else {
      return (
        <button
          className="ui basic button"
          onClick={this.handleClick}
        >
          Pin Zume
        </button>
      );
    }
  },

  render: function () {
    return (
      this.makeButton()
    );
  },

});

module.exports = PinZumeButton;

