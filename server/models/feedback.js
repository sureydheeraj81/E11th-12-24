const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Feedback = sequelize.define("Feedback", {
    sno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    feedback: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Pending", "Resolved"),
        defaultValue: "Pending",
    },
},{
    tableName:"feedback",
    timestamps: true,
})

module.exports = Feedback;