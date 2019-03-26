module.exports = (sequelize, DataType) => {

    
        const Drivers = sequelize.define('Drivers',{
            id:{
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: DataType.STRING,
                allowNull: false,
                validate:{
                    notEmpty:true
                }
            },
            userName:{
               type: DataType.STRING,
               allowNull: false,
               validate:{
                   notEmpty:true
               }
               },
           password:{
               type: DataType.TEXT,
               allowNull: false,
               validate:{
                   notEmpty:true
                       }
              },
           state:{
               type: DataType.BOOLEAN,
               allowNull: true,
               validate:{
                   notEmpty:true
                       }
              }
            
    
        });
     Drivers.associate = (models) => {
       // Drivers.hasMany(models.orders);
     }

     return Drivers;
 };