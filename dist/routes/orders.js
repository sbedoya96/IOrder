"use strict";

module.exports = function (app) {
  var Order = app.db.models.Orders;
  var Drivers = app.db.models.Drivers;
  var Adress = app.db.models.adressxClient;
  var Client = app.db.models.Clients;
  app.route('/orders').post(function (req, res) {
    var idClient = GetClientId(req.body.ClientName, req.body.ClientLastName, req.body.Email);
    console.log(idClient);

    if (parseInt(idClient) > 0) {
      var idAdress = GetAdressId(idClient, req.body.Adress);

      if (parseInt(idAdress) > 0) {
        var drivers = GetDriverId();

        if (parseInt(drivers) > 0) {
          Orders.create({
            DeliveryDate: req.body.DeliveryDate,
            HoursRange: req.body.HoursRange,
            idClient: idClient,
            idAdress: idAdress,
            idDrivers: drivers
          });
        } else {
          res.status(500).json({
            msg: 'all drivers offline, sry'
          });
        }
      }
    } else {
      res.status(500).json({
        msg: error.message
      });
      return;
    }

    function GetClientId(name, lastname, email) {
      Client.findOne({
        where: {
          Email: email
        }
      }).then(function (user) {
        if (!user) {
          Client.create({
            ClientName: name,
            ClientLastName: lastname,
            Email: email
          }).then(function (result) {
            var Result = result.dataValues.id;
            return Result;
          }).catch(function (error) {
            return 0;
          });
        }
      });
    }

    function GetClientId(idclient, adress) {
      Adress.create({
        idClient: idclient,
        Adress: adress
      }).then(function (result) {
        var Result = result.dataValues.idAdress;
        return Result;
      }).catch(function (error) {
        return 0;
      });
    }

    function GetDriverId() {
      var Result = 0;
      Drivers.findAll({
        attributes: ['id'],
        where: {
          state: true
        }
      }).then(function (result) {
        if (result) {
          var items = result[Math.floor(Math.random() * result.length)];

          for (var i = 0; i < items.length; i++) {
            var _Result = items[i].dataValues.id;
          }

          return Result;
        }
      });
    }
  });
};