"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const sequelize_1 = require("sequelize");
const repo_config_1 = require("../repositories/repo-config");
class Device extends sequelize_1.Model {
}
exports.Device = Device;
Device.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apiKey: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize: repo_config_1.sequelize,
    tableName: "devices"
});
