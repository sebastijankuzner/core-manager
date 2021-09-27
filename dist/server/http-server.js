"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const hapi_1 = require("@hapi/hapi");
const server_1 = require("./server");
let HttpServer = class HttpServer extends server_1.Server {
    async initialize(name, serverOptions) {
        this.name = name;
        this.server = new hapi_1.Server(this.getServerOptions(serverOptions));
        this.server.app.app = this.app;
        await this.server.register(this.pluginFactory.preparePlugins({
            jsonRpcEnabled: false,
        }));
    }
};
HttpServer = __decorate([
    core_kernel_1.Container.injectable()
], HttpServer);
exports.HttpServer = HttpServer;
//# sourceMappingURL=http-server.js.map