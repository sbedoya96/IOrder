"use strict";

module.exports = function (app) {
  var Order = app.db.models.Orders;
  var Drivers = app.db.models.Drivers;
  var Adress = app.db.models.adressxClient;
  var Client = app.db.models.Clients;
  app.route('/orders').post(function (req, res) {
    var ClientName = req.body.ClientName;
    var ClientLastName = req.body.ClientLastName;
    var Email = req.body.Email;
    var Direccion = req.body.Adress;
    var DeliveryDate = req.body.DeliveryDate;
    var HoursRange = req.body.HoursRange;
    var idClient = GetClientId(ClientName, ClientLastName, Email);

    if (parseInt(idClient) > 0) {
      var idAdress = GetAdressId(idClient, Direccion);

      if (parseInt(idAdress) > 0) {
        var drivers = GetDriverId();

        if (parseInt(drivers) > 0) {
          Orders.create({
            DeliveryDate: DeliveryDate,
            HoursRange: HoursRange,
            idClient: idClient,
            idAdress: idAdress,
            idDrivers: drivers
          });
        } else {
          console.log({
            msg: error.message
          });
        }
      }
    } else {
      res.status(500).json({
        msg: "Email Exits"
      });
      return;
    }

    function ValidateEmail(email) {
      Client.findOne({
        where: {
          Email: email
        }
      }).then(function (result) {
        return result;
      });
    }

    function GetClientId(name, lastname, email) {
      if (ValidateEmail(email) == null) {
        Client.create({
          ClientName: name,
          ClientLastName: lastname,
          Email: email
        }).then(function (result) {
          var Result = result.dataValues.id;
          return Result;
        }).catch(function (error) {
          console.log({
            msg: error.message
          });
          return;
        });
      } else {
        return 0;
      }
    }

    function GetAdressId(id, address) {
      Adress.create({
        idClient: idclient,
        Adress: address
      }).then(function (result) {
        var Result = result.dataValues.idAdress;
        return Result;
      }).catch(function (error) {
        console.log({
          msg: error.message
        });
        return;
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