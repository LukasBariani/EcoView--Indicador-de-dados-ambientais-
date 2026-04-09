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
exports.deleteReadingsByDeviceId = exports.findReadingsByPeriod = exports.createReading = exports.findLastReadingByDeviceId = exports.findReadingsByDeviceId = exports.findAllReadings = void 0;
const reading_model_1 = require("../models/reading-model");
// 🔹 Buscar todas as readings
const findAllReadings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield reading_model_1.Reading.findAll();
});
exports.findAllReadings = findAllReadings;
// 🔹 Buscar readings por device ID
const findReadingsByDeviceId = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reading_model_1.Reading.findAll({ where: { deviceId } });
});
exports.findReadingsByDeviceId = findReadingsByDeviceId;
// 🔹 Buscar última reading de um device
const findLastReadingByDeviceId = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reading_model_1.Reading.findOne({
        where: { deviceId },
        order: [["createdAt", "DESC"]],
    });
});
exports.findLastReadingByDeviceId = findLastReadingByDeviceId;
// 🔹 Criar nova reading
const createReading = (reading) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reading_model_1.Reading.create(reading);
});
exports.createReading = createReading;
// 🔹 Buscar readings por período
const findReadingsByPeriod = (deviceId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reading_model_1.Reading.findAll({
        where: {
            deviceId,
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        },
    });
});
exports.findReadingsByPeriod = findReadingsByPeriod;
// 🔹 Deletar readings de um device
const deleteReadingsByDeviceId = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reading_model_1.Reading.destroy({ where: { deviceId } });
});
exports.deleteReadingsByDeviceId = deleteReadingsByDeviceId;
