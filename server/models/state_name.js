const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const State = sequelize.define("State", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Active", "In-Active"),
        defaultValue: "Active",
    },
},{
    tableName: "state_name",
    timestamps: false,
})

module.exports = State;