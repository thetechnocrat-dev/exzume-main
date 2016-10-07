var React = require('react');
var Modal = require('react-modal');

// Components
var ZumeCorrelation = require('./zumeCorrelation');

var ZumeItem = React.createClass({
  propTypes: {
    zume: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { modalIsOpen: false };
  },

  openModal: function () {
    this.setState({ modalIsOpen: true });
  },

  closeModal: function () {
    this.setState({ modalIsOpen: false });
  },

  clickExpandZume: function () {
    console.log('expand zume');
  },

  render: function () {
    var customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '700px',
      },
    };
    console.log(this.props);

    return (
      <div className="item">
        <i
          className="large expand middle aligned icon"
          style={{ paddingLeft: '1px', cursor: 'pointer' }}
          onClick={this.openModal}
        />
        <div className="content">
          <div className="header">{this.props.zume.message}</div> 
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <ZumeCorrelation
            data={this.props.zume.data}
            correlation={this.props.zume.correlateInfo.correlation}
            confidence={this.props.zume.correlateInfo.confidence}
            message={this.props.zume.message}
          />
        </Modal>
      </div>
    );
  },

});

module.exports = ZumeItem;

