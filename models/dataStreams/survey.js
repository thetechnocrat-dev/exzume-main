var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  owner: String,
  features: [{
      prompt: String,
      type: String, // see notes below for accepted formats
      dates: [Date],
      data: [],
    },
  ],
}, { autoIndex: false });

module.exports = mongoose.model('Survey', SurveySchema);

// question types:
// agreement scale  - 1 through 7 agreement scale
// text             - short text statement
