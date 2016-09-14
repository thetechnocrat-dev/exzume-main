var React = require('react');
var moment = require('moment');
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
      syncError: false,
      lastSyncTime: this.props.stream.lastSyncTime,
    });
  },

  clickSync: function () {
    var url = 'auth/datastreams/' + this.props.stream.key + '/grab';
    FastFlux.webCycle('get', url, {
      success: this.success,
      error: this.error,
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
    });
  },

  success: function () {
    this.setState({ lastSyncTime: Date.now() });
  },

  error: function () {
    this.setState({ syncError: true });
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
    var style = { marginTop: '0' };
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

  openApp: function () {
    var url = 'http://www.' + this.props.stream.key + '.com';
    window.open(url, '_blank');
  },

  makeFeatures: function () {
    var features = this.props.stream.features.map(function (feature) {
      return feature.name;
    });

    return features.join(', ');
  },

  makeLastSync: function () {
    var style = { fontSize: '0.8em', marginTop: '0' };
    if (this.state.syncError) {
      style.color = 'red';
      return (
        <p style={style}>Last sync failed</p>
      );
    } else {
      style.color = 'green';
      return (
        <p style={style}>{'Last synced ' + moment(this.state.lastSyncTime).fromNow()}</p>
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
    var imgPath = 'images/' + this.props.stream.key + '-logo-round.png';
    var itemStyle = {
      backgroundColor: this.state.backgroundColor,
      borderRadius: '20px',
      maxHeight: this.state.itemHeight,
      overflow: this.state.overflow,
      zIndex: this.state.zIndex,
    };
    var headerStyle = { marginTop: '10px', marginBottom: '0' };
    return (
      <div
        className="eight wide mobile four wide tablet four wide computer column"
        style={itemStyle}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img className="ui image" src={imgPath} onClick={this.openApp} style={imgStyle} />
        <br />
        <h4 className="ui header" style={headerStyle}>{this.props.stream.name}</h4>
        <p style={{ fontSize: '0.8em', margin: '0' }}>{this.makeFeatures()}</p>
        {this.makeLastSync()}
        {this.makeSyncButton()}
      </div>
    );
  },

});

module.exports = DataStreamItem;

