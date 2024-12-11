const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

const registerModel = sequelize.define('userApp', {
  sno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile_no: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  application_no: {
    type: DataTypes.STRING,
    allowNull: true,
    // unique: true,
  },
  usertype: {
    type: DataTypes.ENUM('Govt User', 'Research/Academic User', 'Private User'),
    allowNull: true,
  },
  photo_id_type: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  usertype_doc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idtype_doc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  upload_annexure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  region: {
    type: DataTypes.ENUM('region-1', 'region-2'),
    allowNull: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_activated: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    // allowNull: true,
    defaultValue: 'Active',
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: true,
    // defaultValue: false,
  },
  date_modified: {
    type: DataTypes.DATE,
    // defaultValue: DataTypes.NOW,
  },
  activated_by: {
    type: DataTypes.STRING,
  },
  modified_by: {
    type: DataTypes.STRING,
  },
  deleted_by: {
    type: DataTypes.STRING,
  },
  deleted_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_rejected: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    // allowNull: true,
    defaultValue: 'Pending'

  },

  rejected_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rejected_reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_other: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_category_other: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emptype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'cors_registration_form',
  timestamps: false,

});

// Associations with subscriptionPaymentFinal
registerModel.associate = (models) => {
  // A userApp can have many subscriptionPaymentFinal records
  registerModel.hasMany(models.subscriptionPaymentFinal, {
    foreignKey: "user_reg_id", // The 'user_reg_id' in 'subscriptionPaymentFinal' references 'sno' in 'userApp'
    as: "subscriptions", // Alias for the related subscriptions
  });
};

module.exports = registerModel;
