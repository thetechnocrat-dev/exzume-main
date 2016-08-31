var React = require('react');
var PropTypes = React.PropTypes;
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var Confirm = React.createClass({
  getInitialState: function () {
    return ({
      confirmSuccess: false,
      confirmFailure: false,
      loading: false,
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var url = '/confirm/' + this.props.params.username + '/' + this.props.params.token;

    this.setState({ loading: true });
    FastFlux.webCycle('get', url, {
      success: this.successCallback,
      error: this.errorCallback,
    });
  },

  successCallback: function () {
    this.setState({ confirmSuccess: true });
  },

  errorCallback: function () {
    this.setState({ confirmFailure: true });
  },

  makeContent: function () {
    // makes confirmation button
    if (!this.state.confirmSuccess && !this.state.confirmFailure) {
      if (this.state.loading) {
        return (
          <div
            className="ui green disabled loading fluid large button"
            type="submit">Confirm My Email
          </div>
        );
      } else {
        return (
          <div
            className="ui green fluid large button"
            type="submit"
            onClick={this.handleSubmit}
          >
            Confirm My Email
          </div>
        );
      }

    // makes success or failure message
    } else {
      if (this.state.confirmSuccess) {
        return (
          <h5 className="ui black header">Your email has been confirmed.</h5>
        );
      }

      if (this.state.confirmFailure) {
        return (
          <h5 className="ui red header">Your confirmation link is broken. Recheck your email.</h5>
        );
      }
    }
  },

  render: function () {
    var containerStyle = { paddingTop: '15%' };
    var columnStyle = { maxWidth: '450px', width: '100%' };

    return (
      <div className="ui middle aligned center aligned grid" style={containerStyle}>
        <div className="column" style={columnStyle}>
          <h2 className="ui green header">exzume user email confirmation </h2>
          <div className="ui raised segment">
            {this.makeContent()}
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Confirm;
