var React = require('react');

var Rating = React.createClass({
  propTypes: {
    options: React.PropTypes.object,
    currentRating: React.PropTypes.number.isRequired,
  },

  getInitialState: function () {
    // can add more stuff here to make component more customizable
    var options = this.props.options || { maxRating: 5 };
    return options;
  },

  makeClassNames: function () {
    var cutoff = this.props.currentRating;
    var classNames = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= cutoff) {
        classNames.push('disabled yellow star icon');
      } else if (i - cutoff >= 0.5) {
        classNames.push('disabled star half empty icon');
      } else {
        classNames.push('disabled empty star icon');
      };
    }

    return classNames;
  },

  makeStars: function (classNames) {
    var starStyle = { marginRight: 0, cursor: 'default' };
    return classNames.map(function (className, i) {
      return <i className={className} key={i} style={starStyle} />;
    });
  },

  makeContent: function () {
    var classNames = this.makeClassNames();
    return this.makeStars(classNames);
  },

  render: function () {
    return (
      <div>
        {this.makeContent()}
      </div>
    );
  },

});

module.exports = Rating;

