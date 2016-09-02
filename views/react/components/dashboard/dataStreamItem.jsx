var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');

var ICON_SIZE = '80px';
var ICON_HOVER_SIZE = '85px';
var ITEM_HEIGHT = '100px';

var DataStreamItem = React.createClass({
  propTypes: {
    stream: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return ({
      backgroundColor: Style.lightBackground,
      iconSize: ICON_SIZE,
      overflow: 'hidden',
      zIndex: '0',
      itemHeight: ITEM_HEIGHT,
    });
  },

  clickSync: function () {
    var url = 'auth/datastreams/' + this.props.stream.name + '/grab';
    FastFlux.webCycle('get', url, {
      success: this.success,
      error: this.error,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
    });
  },

  success: function () {
    console.log(this.props.stream.name + ' synced');
  },

  error: function () {
    console.log(this.props.stream.name + ' sync failed');
  },

  handleMouseEnter: function () {
    this.setState({
      backgroundColor: Style.lightBackgroundHover,
      iconSize: ICON_HOVER_SIZE,
      overflow: 'visible',
      zIndex: '1',
      itemHeight: 'none',
    });
  },

  handleMouseLeave: function () {
    this.setState({
      backgroundColor: Style.lightBackground,
      iconSize: ICON_SIZE,
      overflow: 'hidden',
      zIndex: '0',
      itemHeight: ITEM_HEIGHT,
    });
  },

  makeSyncButton: function () {
    var style = { marginTop: '10px' };
    if (this.state.isLoading) {
      return (
        <button className="ui disabled green loading button" style={style}>Sync</button>
      );
    } else {
      return (
        <button className="ui green button" onClick={this.clickSync} style={style}>Sync</button>
      );
    }
  },

  render: function () {
    var imgStyle = {
      cursor: 'pointer',
      height: this.state.iconSize,
      width: this.state.iconSize,
      display: 'inline-block',
    };
    var imgPath = 'images/' + this.props.stream.name + '-logo-round.png';
    var itemStyle = {
      backgroundColor: this.state.backgroundColor,
      borderRadius: '20px',
      maxHeight: this.state.itemHeight,
      overflow: this.state.overflow,
      zIndex: this.state.zIndex,
    };
    return (
      <div
        className="eight wide mobile four wide tablet four wide computer column"
        style={itemStyle}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img className="ui image" src={imgPath} style={imgStyle} />
        <br />
        {this.makeSyncButton()}
      </div>
    );
  },

});

module.exports = DataStreamItem;

