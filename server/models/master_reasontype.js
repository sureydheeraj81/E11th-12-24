const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Master_ReasonType = sequelize.define('Master_Reasontype', {
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
        type: DataTypes.STRING,
        defaultValue: null,
    },
},{
    tableName: "master_reasontype",
    timestamps: true,
})

module.exports = Master_ReasonType;