var React = require('react');
var PropTypes = React.PropTypes;
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var textForm = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    header: React.PropTypes.string.isRequired,
    labels: React.PropTypes.array.isRequired,
    postUrl: React.PropTypes.string.isRequired,
    method: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    var initialState = { errors: '', messages: '', isLoading: false };
    var labels = this.props.labels;
    for (var i = 0; i < labels.length; i++) {
      var label = labels[i];
      initialState[label] = '';
    }

    return initialState;
  },

  clickSubmit: function (event) {
    event.preventDefault();

    // clear messages or erros from last submit and set loading to true
    this.setState({ errors: '', messages: '', isLoading: true });

    var formBody = {};
    var labels = this.props.labels;
    for (var i = 0; i < labels.length; i++) {
      var label = labels[i];
      formBody[label] = this.state[label];
    }

    FastFlux.webCycle(this.props.method, this.props.postUrl, {
      body: formBody,
      success: this.success,
      error: this.error,
    });
  },

  success: function (respData) {
    this.setState({ messages: JSON.stringify(respData), isLoading: false });
  },

  error: function (respError) {
    this.setState({ errors: respError.responseText, isLoading: false });
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

  makeMessagess: function () {
    if (this.state.messages === '') {
      return <div />;
    } else {
      return (
        <div className="ui green message">{this.state.messages}</div>
      );
    }
  },

  makeTextFields: function () {
    var labels = this.props.labels;
    var _this = this;
    return (labels.map(function (label, idx) {
      return (
        <div className="field" key={idx}>
          <label>{label}</label>
          <input
            type="text"
            name={label}
            placeholder=""
            valueLink={_this.linkState(label)}
          ></input>
        </div>
      );
    }));
  },

  makeSubmitButton: function () {
    if (this.state.isLoading) {
      return (
        <div
          className="ui disabled green loading button"
          type="submit"
        >
          Submit
        </div>
      );
    } else {
      return (
        <div
          className="ui green button"
          type="submit"
          onClick={this.clickSubmit}
        >
          Submit
        </div>
      );
    }
  },

  render: function () {
    return (
      <form className="ui form">
        <h2 className="ui header">{this.props.header}</h2>
        {this.makeErrors()}
        {this.makeMessagess()}

        {this.makeTextFields()}

        {this.makeSubmitButton()}
    </form>
    );
  },

});

module.exports = textForm;
