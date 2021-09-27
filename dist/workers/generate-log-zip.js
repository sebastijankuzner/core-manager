"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateLogZip = void 0;
const archiver_1 = __importDefault(require("archiver"));
const path_1 = require("path");
const stream_1 = require("stream");
const generate_log_1 = require("./generate-log");
const log_transform_stream_1 = require("./log-transform-stream");
class GenerateLogZip extends generate_log_1.GenerateLog {
    async execute() {
        await new Promise(async (resolve, reject) => {
            const writeStream = this.prepareOutputStream();
            writeStream.on("close", () => {
                resolve();
            });
            const archive = archiver_1.default("zip", {
                zlib: { level: 9 },
            });
            const handleError = (err) => {
                writeStream.removeAllListeners("close");
                archive.abort();
                writeStream.destroy();
                this.removeTempFiles();
                reject(err);
            };
            archive.on("error", (err) => {
                handleError(err);
            });
            const readStream = stream_1.pipeline(stream_1.Readable.from(this.database.getAllIterator("logs", this.options.query), {
                objectMode: true,
            }), new log_transform_stream_1.LogTransformStream(), (err) => {
                if (err) {
                    handleError(err);
                }
            });
            archive.pipe(writeStream);
            archive.append(readStream, {
                name: path_1.parse(this.options.logFileName).name + ".log",
            });
            archive.finalize();
        });
        this.moveArchive();
    }
}
exports.GenerateLogZip = GenerateLogZip;
//# sourceMappingURL=generate-log-zip.js.map