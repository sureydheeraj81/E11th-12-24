const {  DataTypes } = require('sequelize');
const dataConnection=require("../config/dbConfig")

const UserRegiterM = dataConnection.define('Userregister', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 15]
    }
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 6] 
    }
  },
  userType: {
    type: DataTypes.ENUM('superAdmin', 'admin', 'user'),  
    defaultValue:'user',
    allowNull: false

  },
  browser: {
    type: DataTypes.STRING,
    allowNull: false
  },
  os: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},{
    timestamps:true,
    tableName:"guestRegister"
});

module.exports = UserRegiterM