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
    return { answer: '', isLoading: false };
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
    this.setState({ answer: '', isLoading: 'false' });
  },

  error: function (respError) {
    console.log(respError.respText);
  },

  makeSubmitButton: function () {
    if (this.state.isLoading) {
      return (
        <button
          className="ui disabled loading green button"
        >
            Submit
        </button>
      );
    } else {
      return (
        <button
          onClick={this.clickSubmit}
          className="ui green button"
        >
            Submit
        </button>
      );
    }
  },

  render: function () {
    var inputStyle = { marginTop: '2.5%', marginBottom: '2.5%' };
    return (
      <div className="column">
        <div className="ui cards">
          <div className="card">
            <div className="content">
              <div className="field">
                <label>{this.props.prompt}</label>
                <br />
                  <input
                    style={inputStyle}
                    format="text"
                    name={this.props.prompt}
                    placeholder="enter a number 1 thru 7"
                    valueLink={this.linkState('answer')}
                  />
                <br />
                {this.makeSubmitButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = AgreementScale;
