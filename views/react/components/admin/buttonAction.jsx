var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var ButtonAction = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    method: React.PropTypes.string.isRequired,
    submitUrl: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return { errors: '', messages: '', isLoading: false };
  },

  makeErrors: function () {
    if (this.state.errors === '') {
      return <div />;
    } else {
      return (
        <div className="ui red message">{this.state.errors}</div>
      );
    }
  },

  makeMessages: function () {
    if (this.state.messages === '') {
      return <div />;
    } else {
      return (
        <div className="ui green message">{this.state.messages}</div>
      );
    }
  },

  clickButton: function () {
    this.setState({ errors: '', messages: '', isLoading: true });
    FastFlux.webCycle(this.props.method, this.props.submitUrl, {
      success: this.success,
      error: this.error,
    });
  },

  success: function (resp) {
    this.setState({ messages: JSON.stringify(resp), isLoading: false });
  },

  error: function (respError) {
    this.setState({ errors: respError.responseText, isLoading: false });
  },

  makeButton: function (res) {
    if (this.state.isLoading) {
      return (
        <button className="ui green disabled loading button">{this.props.label}</button>
      );
    } else {
      return (
        <button className="ui green button" onClick={this.clickButton}>{this.props.label}</button>
      );
    }
  },

  render: function () {
    return (
      <div>
        {this.makeErrors()}
        {this.makeMessages()}
        {this.makeButton()}
      </div>
    );
  },

});

module.exports = ButtonAction;
