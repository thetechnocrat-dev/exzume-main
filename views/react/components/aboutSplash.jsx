var React = require('react');

var aboutSplash = React.createClass({
  getInitialState: function () {
    return { hover: false };
  },

  toggleHover: function () {
    this.setState({ hover: !this.state.hover });
  },

  render: function () {
    var splashPictureStyle = {
      height: '208',
      minWidth: '100%',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      transition: 'all .5s ease-in-out',
      backgroundImage: 'url(' + this.props.imgPath + ')',
    };

    if (this.state.hover) {
      splashPictureStyle.backgroundSize = '120% 120%';
    };

    return (
      <div style={splashPictureStyle}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
      </div>
    );
  },

});

module.exports = aboutSplash;
