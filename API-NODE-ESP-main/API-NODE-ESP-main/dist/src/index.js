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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const repo_config_1 = require("./repositories/repo-config");
const user_model_1 = require("./models/user-model");
const device_model_1 = require("./models/device-model");
const reading_model_1 = require("./models/reading-model");
const app = (0, app_1.default)();
const port = 3333;
app.listen(port, () => {
    console.log(`🐱‍🐉 server running at por http://localhost:${port}`);
});
repo_config_1.sequelize.authenticate()
    .then(() => console.log("✅ Conectado ao MySQL"))
    .catch((err) => console.error("❌ Erro ao conectar no MySQL:", err));
// Sincronize na ORDEM CORRETA
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_model_1.User.sync({ alter: true });
            console.log("✅ Tabela users sincronizada");
            yield device_model_1.Device.sync({ alter: true });
            console.log("✅ Tabela devices sincronizada");
            yield reading_model_1.Reading.sync({ alter: true });
            console.log("✅ Tabela readings sincronizada");
            console.log("📦 Todas as tabelas sincronizadas com sucesso!");
        }
        catch (error) {
            console.error("❌ Erro ao sincronizar tabelas:", error);
        }
    });
}
syncDatabase();
