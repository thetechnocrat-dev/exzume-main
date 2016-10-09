var React = require('react');
var FastFlux = require('../../util/fast-flux-react/fastFlux');
var Style = require('../../util/style');

var ConnectionItem = React.createClass({
  propTypes: {
    streamName: React.PropTypes.string.isRequired,
    syncIcon: React.PropTypes.string,
  },

  getInitialState: function () {
    return ({ loading: false });
  },

  successCallback: function (streamName) {
    console.log(streamName + ' sync complete!');
    this.setState({ loading: false });
  },

  errorCallback: function () {
    console.log('sync error.');
    this.setState({ loading: false });
  },

  clickIcon: function (streamName) {
    this.setState({ loading: true });
    FastFlux.webCycle('get', '/auth/datastreams/' + streamName + '/grab', {
      shouldStoreReceive: true,
      storeActionType: 'SESSION_RECEIVED',
      success: this.successCallback.bind(null, streamName),
      error: this.errorCallback,
    });
  },

  makeLoadingButton: function () {
    if (this.state.loading) {
      return (
        <div
          className="ui active inverted dimmer"
          style={{ backgroundColor: Style.lightBackground }}
        >
          <div className="ui text loader">Syncing</div>
        </div>
      );
    }
  },

  render: function () {
    return (
      <div className ='centered column' style={{ textAlign: 'center' }}>
        {this.makeLoadingButton()}
        <img
          className='ui image'
          src={this.props.syncIcon}
          onClick= {this.clickIcon.bind(null, this.props.streamName)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    );
  },

});

module.exports = ConnectionItem;
