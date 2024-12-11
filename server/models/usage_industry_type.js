
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');


const usageIndustryType = sequelize.define('UserType', {
    industryType: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    rtkRegion1: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    rtkRegion2: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    rdsRegion1: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    rdsRegion2: {
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
    timestamps: true,
    tableName: "cors_usage_industrywise",
     
});

module.exports = usageIndustryType;

