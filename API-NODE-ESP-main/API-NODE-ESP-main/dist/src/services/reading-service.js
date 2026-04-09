"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createReadingService = exports.getLastReadingByDeviceIdService = exports.getReadingsByDeviceIdService = exports.getReadingsService = void 0;
// services/reading-service.ts
const httpResponse = __importStar(require("../../utils/http-helper"));
const readingRepository = __importStar(require("../repositories/reading-repo"));
const deviceRepository = __importStar(require("../repositories/device-repo"));
const getReadingsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield readingRepository.findAllReadings();
    return data.length > 0 ? yield httpResponse.ok(data) : yield httpResponse.noContent();
});
exports.getReadingsService = getReadingsService;
const getReadingsByDeviceIdService = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield deviceRepository.findDeviceByID(deviceId);
    if (!device) {
        return yield httpResponse.notFound("Device não encontrado");
    }
    const data = yield readingRepository.findReadingsByDeviceId(deviceId);
    return data.length > 0 ? yield httpResponse.ok(data) : yield httpResponse.noContent();
});
exports.getReadingsByDeviceIdService = getReadingsByDeviceIdService;
const getLastReadingByDeviceIdService = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield deviceRepository.findDeviceByID(deviceId);
    if (!device) {
        return yield httpResponse.notFound("Device não encontrado");
    }
    const data = yield readingRepository.findLastReadingByDeviceId(deviceId);
    return data ? yield httpResponse.ok(data) : yield httpResponse.noContent();
});
exports.getLastReadingByDeviceIdService = getLastReadingByDeviceIdService;
const createReadingService = (reading, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!reading || Object.keys(reading).length === 0) {
        console.log("Dados da reading são obrigatórios");
        return yield httpResponse.badRequest();
    }
    // Verificar se o device existe
    const device = apiKey
        ? yield deviceRepository.findDeviceByApiKey(apiKey)
        : yield deviceRepository.findDeviceByID(reading.deviceId);
    if (!device) {
        return yield httpResponse.notFound("Device não encontrado");
    }
    // Se veio por API key, usar o deviceId correto
    if (apiKey) {
        reading.deviceId = device.id;
    }
    // 🔹 Mapeia os campos que o ESP envia
    const normalizedReading = {
        temperature: reading.temperature,
        humidity: reading.humidity,
        luminosity: (_a = reading.ldr) !== null && _a !== void 0 ? _a : 0,
        gas: (_b = reading.mq135) !== null && _b !== void 0 ? _b : 0,
        deviceId: reading.deviceId
    };
    // Validações básicas
    if (normalizedReading.temperature < -50 || normalizedReading.temperature > 100) {
        console.log("Temperatura fora do range válido (-50 a 100)");
        return yield httpResponse.badRequest();
    }
    if (normalizedReading.humidity < 0 || normalizedReading.humidity > 100) {
        console.log("Umidade fora do range válido (0 a 100)");
        return yield httpResponse.badRequest();
    }
    // Criar no banco
    const createdReading = yield readingRepository.createReading(normalizedReading);
    return yield httpResponse.created(createdReading);
});
exports.createReadingService = createReadingService;
