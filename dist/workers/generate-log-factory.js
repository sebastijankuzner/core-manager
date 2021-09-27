"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLogFactory = void 0;
const generate_log_gz_1 = require("./generate-log-gz");
const generate_log_zip_1 = require("./generate-log-zip");
exports.generateLogFactory = (options) => {
    if (options.archiveFormat === "gz") {
        return new generate_log_gz_1.GenerateLogGz(options);
    }
    return new generate_log_zip_1.GenerateLogZip(options);
};
//# sourceMappingURL=generate-log-factory.js.map