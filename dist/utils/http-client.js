"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const got_1 = __importDefault(require("got"));
class HttpClient {
    constructor(connectionData) {
        this.connectionData = connectionData;
    }
    async get(path) {
        const url = `${this.connectionData.protocol}://${this.connectionData.ip}:${this.connectionData.port}${path}`;
        return got_1.default.get(url).json();
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.js.map