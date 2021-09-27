"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogTransformStream = void 0;
const stream_1 = require("stream");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
class LogTransformStream extends stream_1.Transform {
    constructor() {
        super({ writableObjectMode: true });
    }
    _transform(chunk, encoding, callback) {
        this.push(this.formatLog(chunk));
        callback();
    }
    formatLog(log) {
        return `[${dayjs_1.default.unix(log.timestamp).utc().format("YYYY-MM-DD HH:mm:ss.SSS")}] ${log.level.toUpperCase()} : ${log.content}\n`;
    }
}
exports.LogTransformStream = LogTransformStream;
//# sourceMappingURL=log-transform-stream.js.map