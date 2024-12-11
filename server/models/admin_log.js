const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const admin_log = sequelize.define(
  "admin_log",
  {
    sno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    ipaddress: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    browseragent: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    accessthrough: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    action: {
      type: DataTypes.ENUM("Login", "Logout"),
      defaultValue: "Login",
    },
    session_id: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: "admin_log",
    timestamps: true,
  }
);

module.exports = admin_log;
