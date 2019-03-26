"use strict";

module.exports = function (app) {
  var Drivers = app.db.models.Drivers;

  var config = require('../config/config.js');

  var bcrypt = require('bcryptjs');

  var jwt = require('jsonwebtoken');

  app.route('/drivers').get(function (req, res) {
    Drivers.findAll({
      attributes: ['id', 'name', 'userName', 'state']
    }).then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Drivers.findOne({
      where: {
        userName: req.body.userName
      }
    }).then(function (user) {
      if (user) {
        res.status(500).json({
          msg: 'User ' + req.body.userName + ' has already exist'
        });
        return;
      } else {
        Drivers.create({
          name: req.body.name,
          userName: req.body.userName,
          password: bcrypt.hashSync(req.body.password, 2)
        });
        res.status(201).json({
          msg: 'User ' + req.body.userName + ' has been created'
        });
      }
    }).catch(function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
  app.route('/drivers/login').put(function (req, res) {
    Drivers.findOne({
      where: {
        username: req.body.userName
      }
    }).then(function (user) {
      if (!user) {
        return res.json({
          "message": 'User Not Found.'
        });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.json({
          auth: false,
          accessToken: null,
          reason: "Invalid Password!"
        });
      }

      var token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours

      });
      Drivers.update({
        state: '1'
      }, {
        where: {
          userName: req.body.userName
        }
      }).then(function (driver) {
        res.json({
          user: req.body.userName,
          auth: true,
          accessToken: token,
          state: req.params.state
        });
      });
    }).catch(function (err) {
      res.json('Error -> ' + err);
    });
  });
  app.route('/drivers/logoff').put(function (req, res) {
    Drivers.findOne({
      where: {
        username: req.body.userName
      }
    }).then(function (user) {
      Drivers.update({
        state: '0'
      }, {
        where: {
          userName: req.body.userName
        }
      }).then(function (driver) {
        return res.json({
          "message": req.body.userName + '  has been disconnected'
        });
      });
    }).catch(function (err) {
      res.json('Error -> ' + err);
    });
  });
};