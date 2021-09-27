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
const fs_extra_1 = require("fs-extra");
let Action = class Action {
    constructor() {
        this.name = "configuration.setPlugins";
    }
    async execute(params) {
        await this.updatePlugins(params);
        return {};
    }
    validatePlugins(params) {
        if (typeof params !== "object") {
            throw new Error("Content cannot be resolved");
        }
        for (const application of Object.keys(params)) {
            if (!Array.isArray(params[application].plugins)) {
                throw new Error(`${application} plugins array is missing`);
            }
            if (!params[application].plugins.every((x) => typeof x.package === "string")) {
                throw new Error(`Package is not a string`);
            }
        }
    }
    async updatePlugins(params) {
        this.validatePlugins(params);
        await fs_extra_1.writeJSONSync(this.app.configPath("app.json"), params, { spaces: 4 });
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
//# sourceMappingURL=configuration-set-plugins.js.map