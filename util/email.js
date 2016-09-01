var config = require('../config/config');
var sg = require('sendgrid')(config.sendgrid.apiKey);
var helper = require('sendgrid').mail;

var email = {
  send: function (toEmail, subject, content, options) {
    var options = options || {};
    var fromEmail = options.fromEmail || 'exzume@exzume.com';
    var cb = options.cb || function (err, resp) { console.log(err, resp); };

    fromEmail = new helper.Email(fromEmail);
    var toEmail = new helper.Email(toEmail);
    var content = new helper.Content('text/plain', content);
    mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      cb(error, response);
    });
  },

  welcomeMessage: function (username, token) {
    return (
        'Thank you ' + username + ' for signing up for exzume! We hope this first' +
        'step to cultivating your data yields many benefits. Click on the following link to' +
        ' confirm your email: ' +
        config.baseURL + '/#/confirm/' + username + '/' + token
      );
  },

  forgotMessage: function (username, resetToken) {
    return (
      'Hi ' + username + '. Here is a link to reset your password: ' +
      config.baseURL + '/#/reset-password/' + username + '/' + resetToken
    );
  },

};

module.exports = email;
