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
exports.Action = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
let Action = class Action {
    constructor() {
        this.name = "configuration.getEnv";
    }
    async execute(params) {
        return this.parseEnvContent(await this.getEnvFile());
    }
    async getEnvFile() {
        return (await this.filesystem.get(this.app.environmentFile())).toString();
    }
    parseEnvContent(content) {
        const result = {};
        for (const line of content.split("\n")) {
            const splitLine = line.split("=");
            if (splitLine.length === 2) {
                result[splitLine[0]] = splitLine[1].match(/^[0-9]+$/) ? parseInt(splitLine[1]) : splitLine[1];
            }
        }
        return result;
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
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=configuration-get-env.js.map