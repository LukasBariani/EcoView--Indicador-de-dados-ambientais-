"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ESP Monitoring API',
        version: '1.0.0',
        description: 'API para monitoramento de sensores via ESP32',
    },
    servers: [
        {
            url: 'http://localhost:3333/api',
            description: 'Servidor local',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/routes.ts'], // <== arquivo onde estão suas rotas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
