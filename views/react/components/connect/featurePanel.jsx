var React = require('react');
var FeatureStore = require('../../stores/featureStore');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// components
var FeatureItem = require('./featureItem');

var FeaturePanel = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
  },

  getInitialState: function () {
    return { features: FeatureStore.features(), userActiveStreams: this.userActiveStreams() };
  },

  _onChange: function () {
    this.setState({
      features: FeatureStore.features(), userActiveStreams: this.userActiveStreams(),
    });
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

  userActiveStreams: function () {
    var userActiveStreams = {};
    dataStreams = this.props.user.datastreams;

    for (dataStream in dataStreams) {
      for (var i = 0; i < dataStreams[dataStream].features.length; i++) {
        var userFeature = dataStreams[dataStream].features[i];
        if (userActiveStreams[userFeature.name]) {
          userActiveStreams[userFeature.name].push(dataStream);
        } else {
          userActiveStreams[userFeature.name] = [dataStream];
        }
      }
    }

    return userActiveStreams;
  },

  makeFeatures: function () {
    var _this = this;
    return this.state.features.map(function (feature, idx) {
      var activeStreams = _this.state.userActiveStreams[feature.name] || [];
      return (
        <FeatureItem
          key={idx}
          feature={feature}
          activeStreams={activeStreams}
        />
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
