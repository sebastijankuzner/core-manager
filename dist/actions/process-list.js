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
let Action = class Action {
    constructor() {
        this.name = "process.list";
    }
    async execute(params) {
        return this.getProcessList();
    }
    getProcessList() {
        const cli = this.app.get(ioc_1.Identifiers.CLI);
        const processManager = cli.get(core_cli_1.Container.Identifiers.ProcessManager);
        const processList = processManager.list();
        for (const processInfo of processList) {
            delete processInfo.pm2_env;
            processInfo.monit.memory = Math.round(processInfo.monit.memory / 1024);
            processInfo.status = processManager.status(processInfo.name) || "undefined";
        }
        return processList;
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
//# sourceMappingURL=process-list.js.map