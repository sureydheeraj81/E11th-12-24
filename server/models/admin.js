const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const admin = sequelize.define('Admin', {
    sno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usertype: {
        type: DataTypes.ENUM("superadmin", "admin", "viewer"),
        defaultValue: "viewer",
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail:{
                args: true,
                msg:"Please provide a valid email address."
            }
        }
    },
    mobile: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: null,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        defaultValue: "Male",
    },
    status: {
        type: DataTypes.ENUM("Pending", "Active", "Blocked", "Deleted"),
        defaultValue: "Pending",
    },
    date_modified: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    // date_created: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW,
    // },
    // created_by: {
    //     type: DataTypes.INTEGER,
    // },
    modified_by: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    login_attempt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    failed_attempt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    // deleted_by: {
    //     type: DataTypes.STRING,
    //     defaultValue: null,
    // },
    // deleted_date: {
    //     type: DataTypes.DATE,
    //     defaultValue: null,
    // },
    designation: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    profilePic: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    }
    // createdAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW,
    //     field: 'created_at',
    // },
    // updatedAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW,
    //     field: 'updated_at',
    // },
}, {
    tableName: 'admin',
    timestamps: true,
});

module.exports = admin;