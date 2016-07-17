var React = require('react');
var FeatureStore = require('../../stores/featureStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// components
var FeatureItem = require('./featureItem');

var FeaturePanel = React.createClass({
  getInitialState: function () {
    return { features: FeatureStore.features() };
  },

  _onChange: function () {
    this.setState({ features: FeatureStore.features() });
  },

  componentDidMount: function () {
    this.featureToken = FeatureStore.addListener(this._onChange);
    FastFlux.webCycle('get', '/features', {
      shouldStoreReceive: true,
      storeActionType: 'FEATURES_RECEIVED',
    });
  },

  componentWillUnmount: function () {
    this.featureToken.remove();
  },

  makeFeatures: function () {
    return this.state.features.map(function (feature, idx) {
      return (
        <FeatureItem key={idx} name={feature.name} dataStreams={feature.dataStreams} />
      );
    });
  },

  render: function () {
    return (
      <div className="ui doubling four column grid container">
        {this.makeFeatures()}
      </div>
    );
  },

});

module.exports = FeaturePanel;
