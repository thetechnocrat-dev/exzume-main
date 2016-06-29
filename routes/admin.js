var User = require('../models/user');
var mongoose = require('mongoose');
var child_process = require('child_process');
var Survey = require('../models/dataStreams/survey');

module.exports = function (router, passport) {

  router.put('/addform', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user == null) {
        res.status(401).send('user not found');
      } else if (user) {
        user.formURL = req.body.link;

        user.save(function (err) {
          if (err) { res.send(err); }

          res.json({ message: 'user updated with new form url' });
        });
      }
    });
  });

  router.put('/addinsight', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user === null) {
        res.status(401).send('user not found');
      } else if (user) {
        user.insights.push({
          message: req.body.message,
          liked: false,
        });

        user.save(function (err) {
          if (err) { res.send(err); }

          res.json({ message: 'user updated with new insight' });
        });
      }
    });
  });

  router.put('/addvis', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user == null) {
        res.status(401).send('user not found');
      } else if (user) {
        user.vis.push({ url: req.body.link });

        user.save(function (err) {
          if (err) { res.send(err); }

          res.json({ message: 'user updated with new vis' });
        });
      }
    });
  });

  router.put('/addcorr', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user == null) {
        res.status(401).send('user not found');
      } else if (user) {
        // user.vis.push({ url: req.body.link });
        // seed database
        var exec = child_process.exec;
        exec('mongoimport --db exzume-main --collection surveys --type json --file ../analysis/seed.json', function(err, stout, stderr) {
          if (err) {
            console.log('child process exited with error code', err.code);
            return;
          }
          console.log(stdout);
          // spawn data analysis child process if import succeeds
          var spawn = child_process.spawn;
          var py = spawn('python', ['../analysis/crunch.py']);
          Survey.findOne({ 'owner': req.body.username }, function(err, survey) {
            if (err) {
              res.status(500).send('internal server error - try refreshing the page');
            } else if (survey == null) {
              res.status(401).send('survey responses for user not found');
            } else if (survey) {
              if (survey.features[0].name === req.body.xVar &&
                  survey.features[1].name === req.body.yVar) {
                data1 = survey.features[0].data;
                data2 = survey.features[0].data;
                console.log(JSON.stringify(data1));
                console.log(JSON.stringify(data2));
                py.stdin.write(JSON.stringify(data1));
                py.stdin.write(JSON.stringify(data2));
                py.stdin.end();
                // py.stdout.on('data', function(data1, data2){
                //   dataString += data.toString();
                // });
                // py.stdout.on('end', function(){
                //   console.log('Sum of numbers = ', dataString);
                // });
                //
                // user.vis.push?(function (err) {
                //   if (err) { res.send(err); }
                //
                //   res.json({ message: 'correlation successfully made' });
                // });
              }
            }
          })

        });

      }
    });
  });

};
