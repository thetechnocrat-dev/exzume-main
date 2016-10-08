var React = require('react');

// Components
var AddFeatureDropdownFeatureItem = require('./addFeatureDropdownFeatureItem');

var moodRatingFeature;
var moodNoteFeature;

var AddFeatureDropdownItem = React.createClass({
  propTypes: {
    dataStream: React.PropTypes.object.isRequired,
  },

  makeFeatureItems: function () {
    return this.props.dataStream.features.map(function (feature, idx) {
      if (feature.name != 'Mood Rating' && feature.name != 'Mood Note') {
        return (
          <AddFeatureDropdownFeatureItem key={idx} feature={feature} />
        );
      } else {
        if (feature.name == 'Mood Rating') {
          moodRatingFeature = feature;
          console.log(moodRatingFeature);
          return;
        }

        if (feature.name == 'Mood Note') {
          moodNoteFeature = feature;
          console.log(moodNoteFeature);
          return;
        }
      }

    });
  },

  makeMoodRatingFeatureItem: function () {
    if (this.props.dataStream.name == 'Mood') {
      return (
        <AddFeatureDropdownFeatureItem
          feature={moodRatingFeature}
          moodNoteFeature={moodNoteFeature}
        />
      );
    }
  },

  render: function () {
    return (
      <div className="item">
        <i className="dropdown icon" />
        {this.props.dataStream.name}
        <div className="menu">
          {this.makeFeatureItems()}
          {this.makeMoodRatingFeatureItem()}
        </div>
      </div>
    );
  },

});

module.exports = AddFeatureDropdownItem;
