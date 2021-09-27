"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginFactory = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const crypto_1 = require("@arkecosystem/crypto");
const basicAuthenticationPlugin = __importStar(require("@hapi/basic"));
const rpc = __importStar(require("@hapist/json-rpc"));
const whitelist = __importStar(require("@hapist/whitelist"));
const tokenAuthenticationPlugin = __importStar(require("hapi-auth-bearer-token"));
const action_reader_1 = require("../../action-reader");
const contracts_1 = require("../../contracts");
const ioc_1 = require("../../ioc");
const rpc_response_handler_1 = require("./rpc-response-handler");
let PluginFactory = class PluginFactory {
    preparePlugins(options) {
        const pluginConfig = this.configuration.get("plugins");
        const plugins = [
            {
                plugin: whitelist,
                options: {
                    // @ts-ignore
                    whitelist: pluginConfig.whitelist,
                },
            },
        ];
        if (options.jsonRpcEnabled) {
            plugins.push(this.prepareJsonRpc());
            plugins.push(this.prepareJsonRpcResponseHandler());
        }
        // @ts-ignore
        if (pluginConfig.basicAuthentication.enabled) {
            plugins.push(this.prepareBasicAuthentication());
        }
        // @ts-ignore
        if (pluginConfig.tokenAuthentication.enabled) {
            plugins.push(this.prepareTokenAuthentication());
        }
        return plugins;
    }
    prepareJsonRpc() {
        return {
            plugin: rpc,
            options: {
                methods: this.actionReader.discoverActions(),
                processor: {
                    schema: {
                        properties: {
                            id: {
                                type: ["number", "string"],
                            },
                            jsonrpc: {
                                pattern: "2.0",
                                type: "string",
                            },
                            method: {
                                type: "string",
                            },
                            params: {
                                type: "object",
                            },
                        },
                        required: ["jsonrpc", "method", "id"],
                        type: "object",
                    },
                    validate(data, schema) {
                        try {
                            const { error } = crypto_1.Validation.validator.validate(schema, data);
                            return { value: data, error: error ? error : null };
                        }
                        catch (error) {
                            return { value: null, error: error.stack };
                        }
                    },
                },
            },
        };
    }
    prepareJsonRpcResponseHandler() {
        return {
            plugin: rpc_response_handler_1.rpcResponseHandler,
        };
    }
    prepareBasicAuthentication() {
        return {
            plugin: {
                name: "basicAuthentication",
                version: "0.1.0",
                register: async (server) => {
                    await server.register(basicAuthenticationPlugin);
                    server.auth.strategy("simple", "basic", {
                        validate: async (...params) => {
                            // @ts-ignore
                            return this.validateBasicCredentials(...params);
                        },
                    });
                    server.auth.default("simple");
                },
            },
        };
    }
    async validateBasicCredentials(request, username, password, h) {
        const isValid = await this.basicCredentialsValidator.validate(username, password);
        return { isValid: isValid, credentials: { name: username } };
    }
    prepareTokenAuthentication() {
        return {
            plugin: {
                name: "tokenAuthentication",
                version: "0.1.0",
                register: async (server) => {
                    await server.register(tokenAuthenticationPlugin);
                    server.auth.strategy("simple", "bearer-access-token", {
                        allowQueryToken: true,
                        accessTokenName: "token",
                        validate: async (...params) => {
                            // @ts-ignore
                            return this.validateToken(...params);
                        },
                    });
                    server.auth.default("simple");
                },
            },
        };
    }
    async validateToken(request, token, h) {
        const isValid = await this.tokenValidator.validate(token);
        return { isValid: isValid, credentials: { token } };
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], PluginFactory.prototype, "configuration", void 0);
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.ActionReader),
    __metadata("design:type", action_reader_1.ActionReader)
], PluginFactory.prototype, "actionReader", void 0);
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.BasicCredentialsValidator),
    __metadata("design:type", Object)
], PluginFactory.prototype, "basicCredentialsValidator", void 0);
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.TokenValidator),
    __metadata("design:type", Object)
], PluginFactory.prototype, "tokenValidator", void 0);
PluginFactory = __decorate([
    core_kernel_1.Container.injectable()
], PluginFactory);
exports.PluginFactory = PluginFactory;
//# sourceMappingURL=plugin-factory.js.map