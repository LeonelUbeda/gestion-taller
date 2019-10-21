"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const credencialesDatabase_1 = __importDefault(require("./credencialesDatabase"));
const { database, user, password, host } = credencialesDatabase_1.default;
const sequelize = new sequelize_1.Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        //acquire: 30000,
        idle: 10000
    },
    define: {
        // Evita que modifique el nombre de las tablas. Antes le añadia una 'S'
        freezeTableName: true,
    },
    logging: true
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map