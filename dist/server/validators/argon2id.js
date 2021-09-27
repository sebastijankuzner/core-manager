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
exports.Argon2id = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const argon2_1 = __importDefault(require("argon2"));
let Argon2id = class Argon2id {
    async validate(username, password) {
        try {
            const pluginsConfiguration = this.configuration.get("plugins");
            // @ts-ignore
            const secret = pluginsConfiguration.basicAuthentication.secret;
            core_kernel_1.Utils.assert.defined(secret);
            // @ts-ignore
            const users = pluginsConfiguration.basicAuthentication.users;
            core_kernel_1.Utils.assert.array(users);
            const user = users.find((x) => x.username === username);
            core_kernel_1.Utils.assert.defined(user);
            const options = {
                secret: Buffer.from(secret),
                type: argon2_1.default.argon2id,
            };
            return await argon2_1.default.verify(user.password, password, options);
        }
        catch { }
        return false;
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], Argon2id.prototype, "configuration", void 0);
Argon2id = __decorate([
    core_kernel_1.Container.injectable()
], Argon2id);
exports.Argon2id = Argon2id;
//# sourceMappingURL=argon2id.js.map