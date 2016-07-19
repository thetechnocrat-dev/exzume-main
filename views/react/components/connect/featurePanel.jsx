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
    return {
      features: FeatureStore.features(),
      userActiveFeatures: this.userActiveFeatures(),
      userActiveStreams: this.userActiveStreams(),
    };
  },

  _onChange: function () {
    this.setState({
      features: FeatureStore.features(), userActiveFeatures: this.userActiveFeatures(),
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

  userActiveDataStream: function () {
    var dataStreams = this.props.user.datastreams;
    var userActiveStreams = [];
    for (dataStream in dataStreams) {
      if (dataStream.isConnected) {
        userActiveStreams.push(dataStream.name);
      }
    }

    return userActiveStreams;
  },

  userActiveFeatures: function () {
    var userActiveFeatures = {};
    dataStreams = this.props.user.datastreams;

    for (dataStream in dataStreams) {
      for (var i = 0; i < dataStreams[dataStream].features.length; i++) {
        var userFeature = dataStreams[dataStream].features[i];
        if (userActiveFeatures[userFeature.name]) {
          userActiveFeatures[userFeature.name].push(dataStream);
        } else {
          userActiveFeatures[userFeature.name] = [dataStream];
        }
      }
    }

    return userActiveFeatures;
  },

  makeFeatures: function () {
    var _this = this;
    return this.state.features.map(function (feature, idx) {
      var activeStreams = _this.state.userActiveFeatures[feature.name] || [];
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
