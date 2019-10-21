"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../Database/database"));
const Cliente = database_1.default.define('cliente', {
    ID: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: sequelize_1.default.STRING(30)
    },
    nombre: {
        type: sequelize_1.default.STRING(30)
    },
    apellido: {
        type: sequelize_1.default.STRING(30)
    },
    contrasena: {
        type: sequelize_1.default.STRING(50)
    }
});
exports.default = Cliente;
//# sourceMappingURL=Cliente.js.map