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
const core_cli_1 = require("@arkecosystem/core-cli");
const core_kernel_1 = require("@arkecosystem/core-kernel");
const ioc_1 = require("../ioc");
const utils_1 = require("../utils");
let Action = class Action {
    constructor() {
        this.name = "info.lastForgedBlock";
        this.schema = {
            type: "object",
            properties: {
                token: {
                    type: "string",
                },
            },
        };
    }
    async execute(params) {
        params = {
            token: this.app.token(),
            ...params,
        };
        return await this.getLastForgedBlock(params.token);
    }
    async getLastForgedBlock(token) {
        const cli = this.app.get(ioc_1.Identifiers.CLI);
        const processManager = cli.get(core_cli_1.Container.Identifiers.ProcessManager);
        const processName = utils_1.Utils.getCoreOrForgerProcessName(utils_1.Utils.getOnlineProcesses(processManager), token);
        const response = await processManager.trigger(processName, "forger.lastForgedBlock");
        const result = utils_1.Utils.parseProcessActionResponse(response);
        if (result.error) {
            throw new Error("Trigger returned error");
        }
        return result.response;
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.Application),
    __metadata("design:type", core_kernel_1.Application)
], Action.prototype, "app", void 0);
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=info-last-forged-block.js.map