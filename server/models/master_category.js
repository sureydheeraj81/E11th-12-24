const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Master_category = sequelize.define(
  "Master_category",
  {
    sno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Browser: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    ipaddress: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: "master_category",
  }
);

module.exports = Master_category;
