module.exports = (sequelize, DataType) => {

   const Clients = sequelize.define('Clients',{
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        
        ClientName:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
        Email:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
        ClientLastName:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },


    });
    Clients.associate = (models) => {
        
        //Clients.hasMany(models.orders)
    }

    return Clients;
};