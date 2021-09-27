"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateLogGz = void 0;
const stream_1 = require("stream");
const zlib_1 = __importDefault(require("zlib"));
const generate_log_1 = require("./generate-log");
const log_transform_stream_1 = require("./log-transform-stream");
class GenerateLogGz extends generate_log_1.GenerateLog {
    async execute() {
        await new Promise((resolve, reject) => {
            const writeStream = this.prepareOutputStream();
            stream_1.pipeline(stream_1.Readable.from(this.database.getAllIterator("logs", this.options.query), { objectMode: true }), new log_transform_stream_1.LogTransformStream(), zlib_1.default.createGzip(), writeStream, (err) => {
                if (err) {
                    writeStream.destroy();
                    this.removeTempFiles();
                    reject(err);
                }
                else {
                    this.moveArchive();
                    resolve();
                }
            });
        });
    }
}
exports.GenerateLogGz = GenerateLogGz;
//# sourceMappingURL=generate-log-gz.js.map