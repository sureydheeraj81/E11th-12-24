const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Subs_Rejection = sequelize.define('Subs_Rejection', {
    sno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    browser: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    ipaddress: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    updated_by: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
},{
    tableName: "subs_rejection",
    timestamps: true,
})

module.exports = Subs_Rejection;