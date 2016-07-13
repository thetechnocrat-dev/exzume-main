var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  owner: String,
  features: [{
      featureId: Schema.Types.ObjectId,
      prompt: String,
      format: String, // see notes below for accepted formats
      dates: [Date],
      data: [],
    },
  ],
}, { autoIndex: false });

var Survey;

if (mongoose.models.Survey) {
  Survey = mongoose.model('Survey');
} else {
  Survey = mongoose.model('Survey', SurveySchema);
}

module.exports = Survey;

// module.exports = mongoose.model('Survey', SurveySchema);

// question types:
// agreement scale  - 1 through 7 agreement scale
// text             - short text statement
