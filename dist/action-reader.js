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
exports.ActionReader = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
let ActionReader = class ActionReader {
    discoverActions() {
        const methods = [];
        const path = path_1.resolve(__dirname, "./actions");
        const actionFiles = fs_extra_1.readdirSync(path)
            .map((item) => `${path}/${item}`)
            .filter((item) => fs_extra_1.lstatSync(item).isFile())
            .filter((item) => item.endsWith(".js"));
        /* istanbul ignore next */
        for (const file of actionFiles) {
            const actionInstance = this.app.resolve(require(file).Action);
            methods.push(this.prepareMethod(actionInstance));
        }
        return methods;
    }
    /* istanbul ignore next */
    prepareMethod(action) {
        return {
            name: action.name,
            method: async (params) => {
                return action.execute(params);
            },
            schema: action.schema,
        };
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.Application),
    __metadata("design:type", core_kernel_1.Application)
], ActionReader.prototype, "app", void 0);
ActionReader = __decorate([
    core_kernel_1.Container.injectable()
], ActionReader);
exports.ActionReader = ActionReader;
//# sourceMappingURL=action-reader.js.map