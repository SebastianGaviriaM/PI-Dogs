const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
  sequelize.define('temperaments', {
     id: {
       type: DataTypes.UUID,
       defaultValue: () => uuidv1(),
       primaryKey: true,
     },
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     }
   },
   {
    timestamps:false
   });
};