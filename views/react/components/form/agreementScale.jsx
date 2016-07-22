var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var AgreementScale = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    prompt: React.PropTypes.string.isRequired,
    featureName: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return { answer: '' };
  },

  clickSubmit: function () {
    var url = '/auth/userfeatures/survey/' + this.props.featureName;
    FastFlux.webCycle('put', url, {
      success: this.success,
      error: this.error,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
      body: { data: parseInt(this.state.answer) },
    });
  },

  success: function (resp) {
    console.log(resp);
  },

  error: function (respError) {
    console.log(respError.respText);
  },

  render: function () {
    return (
      <div className="field">
        <label>{this.props.prompt}</label>
          <input
            format="text"
            name={this.props.prompt}
            placeholder="enter a number 1 thru 7"
            valueLink={this.linkState('answer')}
          />
        <button
            onClick={this.clickSubmit}
            className="ui green button"
          >
            Submit
          </button>
      </div>
    );
  },

});

module.exports = AgreementScale;
