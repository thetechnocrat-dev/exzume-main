var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var urlTester = React.createClass({
  getInitialState: function () {
    return { url: '', isLoading: false, success: '', error: '', params: '' };
  },

  handleUrlChange: function (event) {
    this.setState({ url: event.target.value });
  },

  handleParamChange: function (event) {
    this.setState({ params: event.target.value });
  },

  error: function (resp) {
    this.setState({ isLoading: false, error: JSON.stringify(resp), message: '' });
  },

  success: function (resp) {
    this.setState({ isLoading: false, success: JSON.stringify(resp), error: '' });
  },

  clickSubmit: function (method) {
    var params = this.state.params == '' ? '{}' : this.state.params;
    var body = { url: this.state.url, method: method, body: params };
    FastFlux.webCycle(
      'post',
      '/admin/url-tester',
      { body: body, success: this.success, error: this.error }
    );
    this.setState({ isLoading: true });
  },

  makeButton: function (method) {
    var buttonStyle = { marginTop: '1%' };
    if (this.state.isLoading) {
      return (
        <div className="ui disabled loading green button" style={buttonStyle}>
          {method + ': ' + this.state.url}          
        </div>
      );
    } else if (method === 'GO') {
      return (
        <a href={this.state.url}>
          <div className="ui green button" style={buttonStyle}>
            {'GO: ' + this.state.url}
          </div>
        </a>
      );
    } else {
      return (
        <div
          className="ui green button"
          style={buttonStyle}
          onClick={this.clickSubmit.bind(null, method)}
        >
          {method + ': ' + this.state.url}
        </div>
      );
    }
  },

  makeError: function () {
    if (this.state.error !== '') {
      return (
        <div className="ui red message">
          {this.state.error}
        </div>
      );
    }
  },

  makeSuccess: function () {
    if (this.state.success !== '') {
      return (
        <div className="ui green message">
          {this.state.success}
        </div>
      );
    }
  },

  render: function () {
    return (
      <div>
        <h2 className="ui header">Url Tester</h2>
        {this.makeError()}
        {this.makeSuccess()}
        <br />
        <label>parameters (query string for get body for put/post requests)</label>
        <br />
        <div className="ui input">
          <input
            type="text"
            placeholder="input as JSON"
            value={this.state.params}
            onChange={this.handleParamChange}
          />
        </div>
        <br />
        <label>url</label>
        <br />
        <div className="ui input">
          <input
            type='text'
            placeholder='input url with https://'
            value={this.state.url}
            onChange={this.handleUrlChange}
          />
        </div>
        <br />
        {this.makeButton('GO')}
        <br />
        {this.makeButton('GET')}
        <br />
        {this.makeButton('POST')}
        <br />
        {this.makeButton('PUT')}
      </div>
    );
  },

});

module.exports = urlTester;

