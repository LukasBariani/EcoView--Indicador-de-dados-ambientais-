"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reading = void 0;
const sequelize_1 = require("sequelize");
const repo_config_1 = require("../repositories/repo-config");
class Reading extends sequelize_1.Model {
}
exports.Reading = Reading;
Reading.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    deviceId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    temperature: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    luminosity: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    gas: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    humidity: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: repo_config_1.sequelize,
    tableName: "readings",
});
