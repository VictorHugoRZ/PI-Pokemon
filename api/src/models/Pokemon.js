const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: '1'
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: '1'
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: '1'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    timestamps: false
  }
  );
};
