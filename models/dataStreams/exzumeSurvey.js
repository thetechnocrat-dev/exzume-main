var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExzumeSurveySchema = new Schema({
  owner: String,
  icon: String,
  features: [{
      name: String,
      dates: [Date],
      data: [],
    },
  ],
}, { autoIndex: false });

module.exports = mongoose.model('ExzumeSurvey', ExzumeSurveySchema);
