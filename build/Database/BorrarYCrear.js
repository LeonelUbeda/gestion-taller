"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const Cliente_1 = __importDefault(require("../Models/Cliente"));
Cliente_1.default.sync({ force: true });
database_1.default.sync({ force: true })
    .then(() => console.log("Sincronizando"))
    .then(() => { process.exit(); });
//# sourceMappingURL=BorrarYCrear.js.map