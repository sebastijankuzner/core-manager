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
exports.SimpleTokenValidator = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
let SimpleTokenValidator = class SimpleTokenValidator {
    async validate(token) {
        const tokenToCompare = this.configuration.get("plugins.tokenAuthentication.token", undefined);
        if (!tokenToCompare) {
            return false;
        }
        return token === tokenToCompare;
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], SimpleTokenValidator.prototype, "configuration", void 0);
SimpleTokenValidator = __decorate([
    core_kernel_1.Container.injectable()
], SimpleTokenValidator);
exports.SimpleTokenValidator = SimpleTokenValidator;
//# sourceMappingURL=token.js.map