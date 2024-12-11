
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');


const usageUserType = sequelize.define('UserType', {
    user_type: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    rtk_region_1: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    rtk_region_2: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    rds_region_1: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    rds_region_2: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    submitted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: "cors_usage_usertypes",

});

module.exports = usageUserType;
