console.log('currently in ' + process.env.NODE_ENV + ' mode');

// exports either development or production configurations
module.exports = require('./env/' + process.env.NODE_ENV + '.js');