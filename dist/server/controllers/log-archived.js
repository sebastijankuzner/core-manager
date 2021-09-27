"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogArchivedController = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const path_1 = require("path");
let LogArchivedController = class LogArchivedController {
    async file(request, h) {
        const logsPath = path_1.join(process.env.CORE_PATH_DATA, "log-archive");
        const fileName = request.params.id;
        const file = await this.filesystem.get(path_1.join(logsPath, fileName));
        if (path_1.extname(fileName) === ".gz") {
            return h
                .response(file)
                .header("Content-Type", "application/gzip")
                .header("Content-Encoding", "gzip")
                .header("Content-Disposition", "attachment; filename= " + fileName);
        }
        return h
            .response(file)
            .header("Content-Type", "application/zip")
            .header("Content-Disposition", "attachment; filename= " + fileName);
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.FilesystemService),
    __metadata("design:type", Object)
], LogArchivedController.prototype, "filesystem", void 0);
LogArchivedController = __decorate([
    core_kernel_1.Container.injectable()
], LogArchivedController);
exports.LogArchivedController = LogArchivedController;
//# sourceMappingURL=log-archived.js.map