var User = require('../models/user');
var Fitbit = require('../models/dataStreams/fitbit');
var Survey = require('../models/dataStreams/survey');
var Feature = require('../models/feature');
var mongoose = require('mongoose');
var child_process = require('child_process');

module.exports = function (router, passport) {

  router.route('/features/:featureId')
    .get(function (req, res) {
      Feature.findOne({ _id: req.params.featureId }, function (err, feature) {
        if (err) res.send(err);
        if (feature) res.json(feature);
      });
    })
    .put(function (req, res) {
      Feature.findOne({ $or: [{ _id: req.params.featureId },
                              { name: req.body.name }] }, function (err, feature) {
        if (feature) {
          if (req.body.name) feature.name = req.body.name;
          if (req.body.dataStream) feature.dataStreams.push(req.body.dataStream);
          if (req.body.category) feature.categories.push(req.body.category);
          feature.save(function (err, feature) {
            if (err) res.send(err);
            if (feature) res.json(feature);
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

};
