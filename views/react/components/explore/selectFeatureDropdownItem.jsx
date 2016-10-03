var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

var moodNoteFeature;

var DropdownItem = React.createClass({
  propTypes: {
    dataStream: React.PropTypes.object.isRequired,
  },

  makeFeatureItems: function () {
    var _this = this;
    return this.props.dataStream.features.map(function (feature, idx) {
      if (feature.name != 'Mood Note') {
        return (
          <div
            className="item"
            key={idx}
            onClick={_this.clickFeatureItem.bind(null, feature)}
          >
            {feature.name}
          </div>
        );
      } else {
        moodNoteFeature = feature;
        console.log(moodNoteFeature);
        return;
      }
    });
  },

  clickFeatureItem: function (feature) {
    if (feature.name == 'Mood Rating') {
      FastFlux.cycle('FEATURE_RECEIVED', feature);
      console.log('sending mood note...');
      console.log(moodNoteFeature);
      FastFlux.cycle('MOOD_FEATURE_RECEIVED', moodNoteFeature);
    } else {
      FastFlux.cycle('FEATURE_RECEIVED', feature);
    }
  },

  render: function () {
    return (
      <div className="item">
        <i className="dropdown icon" />
        {this.props.dataStream.name}
        <div className="menu">
          {this.makeFeatureItems()}
        </div>
      </div>
    );
  },

});

module.exports = DropdownItem;
