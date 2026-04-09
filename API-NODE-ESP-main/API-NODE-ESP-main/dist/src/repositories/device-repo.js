"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDevice = exports.createDevice = exports.findDeviceByApiKey = exports.findDevicesByUserID = exports.findDeviceByID = exports.findAllDevices = void 0;
const device_model_1 = require("../models/device-model");
const findAllDevices = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield device_model_1.Device.findAll();
});
exports.findAllDevices = findAllDevices;
const findDeviceByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield device_model_1.Device.findByPk(id);
});
exports.findDeviceByID = findDeviceByID;
const findDevicesByUserID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield device_model_1.Device.findAll({ where: { userId } });
});
exports.findDevicesByUserID = findDevicesByUserID;
const findDeviceByApiKey = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    return yield device_model_1.Device.findOne({ where: { apiKey } });
});
exports.findDeviceByApiKey = findDeviceByApiKey;
const createDevice = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield device_model_1.Device.create(data);
});
exports.createDevice = createDevice;
const deleteDevice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield device_model_1.Device.destroy({ where: { id } });
    return deleted > 0;
});
exports.deleteDevice = deleteDevice;
