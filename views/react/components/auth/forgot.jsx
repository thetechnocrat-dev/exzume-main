var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Forgot = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { email: '', loading: false, successMessage: null, errorMessage: null };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ loading: true });
    FastFlux.webCycle('post', '/forgot', {
      body: { email: this.state.email },
      success: this.success,
      error: this.error,
    });
  },

  success: function (resp) {
    this.setState({ loading: false, successMessage: resp.message, errorMessage: null }); },

  error: function (resp) {
    this.setState({ loading: false, errorMessage: resp.responseText });
  },

  makeSubmitButton: function () {
    if (this.state.loading) {
      return (
        <div
          className="ui green disabled loading fluid large button"
          type="submit">Submit
        </div>
      );
    } else {
      return (
        <div
          className="ui green fluid large button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit
        </div>
      );
    }
  },

  makeErrorMessage: function () {
    if (this.state.errorMessage) {
      return (
        <div className="ui error message">
          {this.state.errorMessage}
        </div>
      );
    }
  },

  makeContent: function () {
    if (this.state.successMessage) {
      return (<h5 className="ui black header">{this.state.successMessage}</h5>);
    } else {
      var formStyle = { backgroundColor: 'white' };
      return (
        <form className="ui large form" style={formStyle}>
          <div className="field">
            <div className="ui left icon input">
              <i className="mail icon" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                valueLink={this.linkState('email')}
              />
            </div>
          </div>
          {this.makeSubmitButton()}
        </form>
      );
    }
  },

  render: function () {
    var containerStyle = { paddingTop: '15%' };
    var columnStyle = { maxWidth: '450px', width: '100%' };

    return (
      <div className="ui middle aligned center aligned grid" style={containerStyle}>
	    <div className="column" style={columnStyle}>
          <h2 className="ui green header">exzume forgot password</h2>
          <div className="ui raised segment">
            {this.makeContent()}  
          </div>
          {this.makeErrorMessage()}
        </div>
      </div>
    );
  },

});

module.exports = Forgot;

