var React = require('react');

var Navbar = React.createClass({

  render: function () {
    // Technical Debt Warning: this code is not at all DRY and the z-index is kinda hacky
    var largeMonitorStyle = { width: '1127px', margin: '0 auto', left: '0', right: '0', zIndex: '', };
    var smallMonitorStyle = { width: '933px', margin: '0 auto', left: '0', right: '0', zIndex: '9', };
    var tabletStyle = { width: '723px', margin: '0 auto', left: '0', right: '0', zIndex: '7', };
    var mobileStyle = { width: '100%', margin: '0 auto', left: '0', right: '0', zIndex: '5', };

    return (
      <div className="ui grid container">
        <div className="large screen only row">
          <div className="ui top fixed inverted menu" style={largeMonitorStyle}>
            <div className="item">Exzume</div>
            <div className="right menu">
              <div className="item">User42</div>
            </div>
          </div>
        </div>
        <div className="small screen only row">
          <div className="ui top fixed inverted menu" style={smallMonitorStyle}>
            <div className="item">Exzume</div>
            <div className="right menu">
              <div className="item">User42</div>
            </div>
          </div>
        </div>
        <div className="tablet only row">
          <div className="ui top fixed inverted menu" style={tabletStyle}>
            <div className="item">Exzume</div>
            <div className="right menu">
              <div className="item">User42</div>
            </div>
          </div>
        </div>
        <div className="mobile only row">
          <div className="ui top fixed inverted menu" style={mobileStyle}>
            <div className="item">Exzume</div>
            <div className="right menu">
              <div className="item">User42</div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Navbar;
