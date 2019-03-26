"use strict";

module.exports = function (sequelize, DataType) {
  var Orders = sequelize.define('Orders', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idClient: {
      type: DataType.INTEGER,
      autoIncrement: false
    },
    idAdress: {
      type: DataType.INTEGER,
      autoIncrement: false
    },
    idDriver: {
      type: DataType.INTEGER,
      autoIncrement: false
    },
    DeliveryDate: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    HoursRange: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Orders.associate = function (models) {
    //Orders.belongsTo(models.Clients);
    Orders.belongsTo(models.adressxClient, {
      foreignKey: 'idAdress',
      targetKey: 'idAdress'
    });
    Orders.belongsTo(models.Clients, {
      foreignKey: 'idClient',
      targetKey: 'id'
    });
    Orders.belongsTo(models.Drivers, {
      foreignKey: 'idDriver',
      targetKey: 'id'
    }); //Orders.belongsTo(models.drivers);
  };

  return Orders;
};