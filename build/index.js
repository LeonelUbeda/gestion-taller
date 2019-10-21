"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
function main() {
    app_1.default.listen(5555, () => {
        console.log('Server montado');
    });
}
main();
//# sourceMappingURL=index.js.map