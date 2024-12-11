const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const subscription_plan = sequelize.define("subscription_plan", {
    sno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cors_plan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cors_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscription_charges: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GST_amt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Active", "In-Active"),
        defaultValue: "Active",
    }
},{
    tableName: "subscription_plan",
    timestamps: true,
})

module.exports = subscription_plan;