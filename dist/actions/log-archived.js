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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const public_ip_1 = __importDefault(require("public-ip"));
const ioc_1 = require("../ioc");
let Action = class Action {
    constructor() {
        this.name = "log.archived";
    }
    async execute(params) {
        const serverUrl = await this.getServerUrl();
        return Promise.all((await this.getArchivedLogs()).map((logPath) => this.getArchiveInfo(serverUrl, logPath)));
    }
    async getArchiveInfo(serverUrl, logPath) {
        return {
            name: path_1.basename(logPath),
            size: Math.round((await this.filesystem.size(logPath)) / 1024),
            downloadLink: `${serverUrl}/log/archived/${path_1.basename(logPath)}`,
        };
    }
    async getArchivedLogs() {
        const logsPath = path_1.join(process.env.CORE_PATH_DATA, "log-archive");
        if (!fs_extra_1.pathExistsSync(logsPath)) {
            return [];
        }
        const files = await this.filesystem.files(logsPath);
        return files.filter((fileName) => path_1.basename(fileName)[0] !== ".");
    }
    async getServerUrl() {
        let publicIp = this.configuration.getOptional("server.ip", undefined);
        if (!publicIp) {
            publicIp = await public_ip_1.default.v4();
        }
        if (this.app.isBound(ioc_1.Identifiers.HTTPS_JSON_RPC)) {
            return `https://${publicIp}:${this.configuration.getRequired("server.https.port") + 1}`;
        }
        return `http://${publicIp}:${this.configuration.getRequired("server.http.port") + 1}`;
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.Application),
    __metadata("design:type", core_kernel_1.Application)
], Action.prototype, "app", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.FilesystemService),
    __metadata("design:type", Object)
], Action.prototype, "filesystem", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], Action.prototype, "configuration", void 0);
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=log-archived.js.map