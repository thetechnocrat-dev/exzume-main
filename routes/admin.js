var User = require('../models/user');
var Feature = require('../models/feature');
var mongoose = require('mongoose');
var childProcess = require('child_process');
var seedDB = require('../config/seedDB');
var email = require('../util/email');
var axios = require('axios');

module.exports = function (router, sg) {

  // only Admin user can access
  router.use(function (req, res, next) {
    if (req.isAuthenticated() && req.user.local.isAdmin) {
      return next();
    } else {
      res.status(403).json({ message: 'unauthorized' });
    }
  }),

  router.route('/features/:featureId')
    .get(function (req, res) {
      Feature.findOne({ _id: req.params.featureId }, function (err, feature) {
        if (err) res.send(err);
        if (feature) res.json(feature);
      });
    })
    .put(function (req, res) {
      console.log('here', req.body, req.params.featureId);
      Feature.findOne({ _id: req.params.featureId }, function (err, feature) {
          if (feature) {
            if (req.body.name) feature.name = req.body.name;
            if (req.body.dataStream) feature.dataStreams.push(req.body.dataStream);
            if (req.body.category) feature.categories.push(req.body.category);
            feature.save(function (err, feature) {
              if (err) {
                res.send(err);
              } else if (feature) {
                res.json(feature);
              } else {
                res.status(401).send('feature not found');
              }
            });
          }
        });
    })
    .post(function (req, res) {
      var newFeature = new Feature();
      newFeature.name = req.body.name;
      newFeature.save(function (err, newFeature) {
        if (err) res.send(err);
        res.json(newFeature);
      });
    })
    .delete(function (req, res) {
      Feature.remove({ _id: req.params.featureId }, function (err, feature) {
        if (err) res.send(err);
        if (feature) res.json(feature);
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

  router.get('/db/seed', function (req, res) {
    var done = function (err, object) {
      if (err) {
        res.send(err);
      } else {
        res.json(object);
      }
    };

    seedDB(done);
  });

  router.get('/testemail', function (req, res) {
    console.log('testemail-refact');
    var done = function (err, response) {
      err ? res.send(err) : res.json(response);
    };

    email.send('exzume.app@gmail.com', 'testing', email.welcomeMessage, { cb: done });
  });

  router.post('/url-tester', function (req, res) {
    console.log('url-tester');
    console.log(req.body);
    if (req.body.method === 'POST' || req.body.method === 'PUT') {
      axios({
        method: req.body.method.toLowerCase(),
        url: req.body.url,
        data: JSON.parse(req.body.body),
        json: true,
      })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        res.send(error);
      });
    } else if (req.body.method === 'GET' && req.body.body === '{}') {
      console.log('no params');
      axios.get(req.body.url)
        .then(function (response) {
          res.json(response.data);
        })
        .catch(function (error) {
          res.send(error);
        });
    } else if (req.body.method === 'GET') {
      console.log('query params');
      axios.get(req.body.url, { params: JSON.parse(req.body.body) })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        res.send(error);
      });
    }
  });

  router.post('/url-tester-post', function (req, res) {
    console.log('url-tester-post');
    console.log(req.body);
    res.json(req.body);
  });

  router.put('/url-tester-put', function (req, res) {
    var body = req.body;
    body.modified = true;
    res.json(req.body);
  });

  router.get('/url-tester-get', function (req, res) {
    var queryParams = req.query;
    console.log(req.query);
    if (Object.keys(req.query).length === 0) {
      res.json({ message: 'success' });
    } else {
      res.json(req.query);
    }
  });

};

