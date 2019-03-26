module.exports = (sequelize, DataType) => {

    const adressxClient = sequelize.define('adressxClient',{
        idAdress:{
             type: DataType.INTEGER,
             primaryKey: true,
             allowNull: false,
             autoIncrement: true,
             validate: {
                notEmpty: true
              }
         },
         
         idClient:{
            type: DataType.INTEGER,
            autoIncrement: false
        },
        
         Adress:{
             type: DataType.DATE,
             allowNull: false,
             validate:{
                 notEmpty:true
             }
         },
         
         
 
     });
     
     adressxClient.associate = (models) => {
        
        adressxClient.belongsTo(models.Clients, {

            foreignKey: 'idClient',
            targetKey: 'id'
        });
        
        
     }

     return adressxClient;
 };