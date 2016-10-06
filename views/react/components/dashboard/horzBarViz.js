var React = require('react');
var Modal = require('react-modal');
var Style = require('../../util/style');

var HorzBarViz = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    avg: React.PropTypes.number.isRequired,
    current: React.PropTypes.number.isRequired,
    fillColor: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return { modalIsOpen: false, hover: false, };
  },

  toggleHover: function () {
    this.setState({ hover: !this.state.hover });
  },

  closeModal: function () {
    this.setState({ modalIsOpen: false });
  },

  openModal: function () {
    this.setState({ modalIsOpen: true });
  },

  calcPercent: function (avg, current) {
    var percentFilled = (current / avg);

    if (percentFilled >= 1) {
      return '100%';
    } else {
      return (percentFilled * 100).toFixed(2) + '%';
    }
  },

  render: function () {
    var fillStyle = {
      backgroundColor: this.props.fillColor,
      width: this.calcPercent(this.props.avg, this.props.current),
      height: '100%',
    };
    var backgroundStyle = {
      width: '100%',
      height: '8px',
      backgroundColor: this.props.backgroundColor,
    };
    var labelStyle = {
      marginBottom: '8px',
      textAlign: 'left',
      width: '50%',
      display: 'inline-block',
    };
    var secondLabelStyle = {
      marginBottom: '8px',
      textAlign: 'right',
      width: '50%',
      display: 'inline-block',
    };
    var customModalStyle = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
      },
    };
    var outerStyle;
    if (this.state.hover) {
      outerStyle = {
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: Style.lightBackgroundHover,
      };
    } else {
      outerStyle = {
        padding: '10px',
        cursor: 'pointer',
      };
    }

    return (
      <div
        style={outerStyle}
        onClick={this.openModal}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <div style={{ display: 'inline-block' }}>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customModalStyle}
          >
            <div
              className="ui icon button"
              onClick={this.closeModal}
              style={{ marginLeft: '419px' }}
            >
              <i className="remove icon" />
            </div>
          </Modal>
        </div>
        <div style={labelStyle}>{this.props.current + ' ' + this.props.label}</div>
        <div style={secondLabelStyle}>{this.props.avg + ' avg'}</div>
        <div style={backgroundStyle}>
          <div style={fillStyle} />
        </div>
      </div>

    );
  },

});

module.exports = HorzBarViz;
