"use strict";

module.exports = function (sequelize, DataType) {
  var Clients = sequelize.define('Clients', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ClientName: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    Email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    ClientLastName: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Clients.associate = function (models) {//Clients.hasMany(models.orders)
  };

  return Clients;
};