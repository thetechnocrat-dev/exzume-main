var React = require('react');
var Modal = require('react-modal');
var FastFlux = require('../../util/fast-flux-react/fastFlux');

// Components

var ABModal = React.createClass({
  propTypes: {
    features: React.PropTypes.array.isRequired,
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

  handleSubmit: function () {
    this.setState({ modalIsOpen: false });
    var groupedBarData = [
          {
             "name": "Less than or equal to 400 minutes asleep",
                    "values": [
                            { "x": 1, "y":  91},
                                  { "x": 2, "y": 290},
                                        { "x": 3, "y": -25},
                                            ]
                                                },
            {  
              "name": "More than 400 minutes asleep",
                      "values": [
                              { "x": 1, "y":  9},
                                    { "x": 2, "y": 49},
                                          { "x": 3, "y": -20},
                                              ]
                                                  },
      ];
    FastFlux.cycle('GROUPED_BAR_DATA_RECEIVED', groupedBarData);
  },

  makeOptions: function () {
    console.log(this.props.features);
    return this.props.features.map(function (feature, idx) {
      return (
        <option value={feature.name} key={idx}>{feature.name}</option>
      );
    });
  },

  render: function () {
    var buttonStyle = { marginLeft: '10px' };
    var customStyles = {
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

    return (
      <div style={{ display: 'inline-block' }}>
        <button
          className="ui green button"
          onClick={this.openModal}
          style={buttonStyle}
        >
          A/B Compare
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div
            className="ui icon button"
            onClick={this.closeModal}
            style={{ marginLeft: '419px' }}
          >
            <i className="remove icon" />
          </div>
          <form className="ui form">
            <div className="ui field">
              <label>Pick a feature</label>
              <select className="ui fluid dropdown">
                <option value="">Select a Feature</option>
                {this.makeOptions()}
              </select>
            </div>
            <div className="ui field">
              <label>Pick a cutoff value</label>
              <input type="text" name="feature" placeholder="input feature" />
            </div>
            <p>ex/ picking minutes asleep as the feature and cutoff as 360 will group your data into 
              days you slept 360 minutes or less and days you slept over 360 minutes and then return
              the features whose averages were most effected.
            </p>
            <button className="ui green button" onClick={this.handleSubmit}>A/B Compare</button>
          </form>
        </Modal>
      </div>
    );
  },

});

module.exports = ABModal;

