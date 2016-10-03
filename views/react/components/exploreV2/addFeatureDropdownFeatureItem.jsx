var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');

var AddFeatureDropdownFeatureItem = React.createClass({
  propTypes: {
    feature: React.PropTypes.object.isRequired,
    moodNoteFeature: React.PropTypes.object,
  },

  getInitialState: function () {
    return { isSelected: false };
  },

  clickItem: function () {
    if (this.state.isSelected) {
      if (this.props.feature.name == 'Mood Rating') {
        FastFlux.cycle('MOOD_FEATURE_REMOVED', this.props.moodNoteFeature);
      }

      FastFlux.cycle('TIME_SERIES_REMOVED', this.props.feature);
    } else {
      if (this.props.feature.name == 'Mood Rating') {
        FastFlux.cycle('MOOD_FEATURE_RECEIVED', this.props.moodNoteFeature);
      }

      FastFlux.cycle('TIME_SERIES_RECEIVED', this.props.feature);
    }

    this.setState({ isSelected: !this.state.isSelected });
  },

  render: function () {
    if (this.state.isSelected) {
      return (
        <div
          className="item"
          onClick={this.clickItem}
        >
          <div className="ui green empty circular label"></div>
          {this.props.feature.name}
        </div>
      );
    } else {
      return (
        <div
          className="item"
          onClick={this.clickItem}
        >
          {this.props.feature.name}
        </div>
      );
    }
  },

});

module.exports = AddFeatureDropdownFeatureItem;
