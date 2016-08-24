var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var urlTester = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { url: '' };
  },

  handleInputChange: function (event) {
    this.setState({ url: event.target.value });
  },

  render: function () {
    return (
      <div>
        <h2 className="ui header">Url Tester</h2>
        <label>url</label>
        <br />
        <div className="ui input">
          <input type='text' value={this.state.url} onChange={this.handleInputChange} />
        </div>
        <br />
        <a href={this.state.url} >
          <div className="ui green button">
            {'Go To: ' + this.state.url}
          </div>
        </a>
      </div>
    );
  },

});

module.exports = urlTester;

