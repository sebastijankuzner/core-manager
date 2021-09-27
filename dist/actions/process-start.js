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
const ioc_1 = require("../ioc");
const cli_manager_1 = require("../utils/cli-manager");
let Action = class Action {
    constructor() {
        this.name = "process.start";
        this.schema = {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                args: {
                    type: "string",
                },
            },
            required: ["name", "args"],
        };
    }
    async execute(params) {
        await this.cliManager.runCommand(`${params.name}:start`, params.args);
        return {};
    }
};
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.CliManager),
    __metadata("design:type", cli_manager_1.CliManager)
], Action.prototype, "cliManager", void 0);
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=process-start.js.map