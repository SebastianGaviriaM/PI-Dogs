const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
  sequelize.define('dog', {
     id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV1,
       primaryKey: true,
     },
     image: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     minHeight: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
     maxHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
     minWeight: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
     maxWeight: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
     minYears: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
     maxYears: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
   },
   {
    timestamps:false
   });
};
