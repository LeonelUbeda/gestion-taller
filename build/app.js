"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import bodyParser from 'body-parser'
const app = express_1.default();
const database_1 = __importDefault(require("./Database/database"));
//Modelos
const Cliente_1 = __importDefault(require("./Models/Cliente"));
Cliente_1.default.sync();
// Verificar que se conectó a la base de datos exitosamente 
database_1.default.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error));
exports.default = app;
//# sourceMappingURL=app.js.map