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
exports.Server = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const hapi_1 = require("@hapi/hapi");
const fs_1 = require("fs");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const contracts_1 = require("../contracts");
const ioc_1 = require("../ioc");
let Server = class Server {
    async initialize(name, serverOptions) {
        this.name = name;
        this.server = new hapi_1.Server(this.getServerOptions(serverOptions));
        this.server.app.app = this.app;
        await this.server.register(this.pluginFactory.preparePlugins({
            jsonRpcEnabled: true,
        }));
        // Disable 2 minute socket timout
        this.getRoute("POST", "/").settings.timeout.socket = false;
    }
    async register(plugins) {
        return this.server.register(plugins);
    }
    async inject(options) {
        return this.server.inject(options);
    }
    async boot() {
        try {
            await this.server.start();
            this.logger.info(`${this.name} Server started at ${this.server.info.uri}`);
        }
        catch {
            await this.app.terminate(`Failed to start ${this.name} Server!`);
        }
    }
    async dispose() {
        try {
            await this.server.stop();
            this.logger.info(`${this.name} Server stopped at ${this.server.info.uri}`);
        }
        catch {
            await this.app.terminate(`Failed to stop ${this.name} Server!`);
        }
    }
    getServerOptions(options) {
        const tmpOptions = lodash_clonedeep_1.default(options);
        delete tmpOptions.enabled;
        if (tmpOptions.tls) {
            tmpOptions.tls.key = fs_1.readFileSync(options.tls.key).toString();
            tmpOptions.tls.cert = fs_1.readFileSync(options.tls.cert).toString();
        }
        return tmpOptions;
    }
    getRoute(method, path) {
        return this.server.table().find((route) => route.method === method.toLowerCase() && route.path === path);
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.Application),
    __metadata("design:type", Object)
], Server.prototype, "app", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.LogService),
    __metadata("design:type", Object)
], Server.prototype, "logger", void 0);
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.PluginFactory),
    __metadata("design:type", Object)
], Server.prototype, "pluginFactory", void 0);
Server = __decorate([
    core_kernel_1.Container.injectable()
], Server);
exports.Server = Server;
//# sourceMappingURL=server.js.map