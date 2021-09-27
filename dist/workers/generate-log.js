"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateLog = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const database_1 = require("../database/database");
class GenerateLog {
    constructor(options) {
        this.options = options;
        this.database = new database_1.Database(options.databaseFilePath, options.schema);
        this.database.boot();
    }
    async execute() { }
    getFilePath() {
        return path_1.join(process.env.CORE_PATH_DATA, "log-archive", this.options.logFileName);
    }
    getTempFilePath() {
        return path_1.join(process.env.CORE_PATH_TEMP, "log-archive", this.options.logFileName);
    }
    prepareOutputStream() {
        fs_extra_1.ensureDirSync(path_1.dirname(this.getTempFilePath()));
        return fs_extra_1.createWriteStream(this.getTempFilePath());
    }
    moveArchive() {
        fs_extra_1.ensureDirSync(path_1.dirname(this.getFilePath()));
        fs_extra_1.renameSync(this.getTempFilePath(), this.getFilePath());
    }
    removeTempFiles() {
        fs_extra_1.removeSync(this.getTempFilePath());
    }
}
exports.GenerateLog = GenerateLog;
//# sourceMappingURL=generate-log.js.map