"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const core_cli_1 = require("@arkecosystem/core-cli");
const core_kernel_1 = require("@arkecosystem/core-kernel");
const joi_1 = __importDefault(require("joi"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const action_reader_1 = require("./action-reader");
const database_logger_1 = require("./database-logger");
const events_database_service_1 = require("./database/events-database-service");
const logs_database_service_1 = require("./database/logs-database-service");
const ioc_1 = require("./ioc");
const listener_1 = require("./listener");
const log_service_wrapper_1 = require("./log-service-wrapper");
const server_1 = require("./server");
const handlers_1 = __importDefault(require("./server/handlers"));
const plugins_1 = require("./server/plugins");
const validators_1 = require("./server/validators");
const snapshots_manager_1 = require("./snapshots/snapshots-manager");
const cli_manager_1 = require("./utils/cli-manager");
const worker_manager_1 = require("./workers/worker-manager");
class ServiceProvider extends core_kernel_1.Providers.ServiceProvider {
    async register() {
        this.app.bind(ioc_1.Identifiers.WatcherDatabaseService).to(events_database_service_1.EventsDatabaseService).inSingletonScope();
        this.app.get(ioc_1.Identifiers.WatcherDatabaseService).boot();
        this.app.bind(ioc_1.Identifiers.LogsDatabaseService).to(logs_database_service_1.LogsDatabaseService).inSingletonScope();
        this.app.get(ioc_1.Identifiers.LogsDatabaseService).boot();
        if (this.config().getRequired("watcher").enabled) {
            this.app.bind(ioc_1.Identifiers.EventsListener).to(listener_1.Listener).inSingletonScope();
            if (this.config().getRequired("watcher.watch.queries")) {
                this.app.bind(core_kernel_1.Container.Identifiers.DatabaseLogger).to(database_logger_1.DatabaseLogger).inSingletonScope();
            }
        }
        if (this.config().getRequired("logs.enabled")) {
            const logService = this.app.get(core_kernel_1.Container.Identifiers.LogService);
            this.app
                .rebind(core_kernel_1.Container.Identifiers.LogService)
                .toConstantValue(new log_service_wrapper_1.LogServiceWrapper(logService, this.app.get(ioc_1.Identifiers.LogsDatabaseService)));
        }
        if (this.isProcessTypeManager()) {
            this.app.bind(ioc_1.Identifiers.ActionReader).to(action_reader_1.ActionReader).inSingletonScope();
            this.app.bind(ioc_1.Identifiers.PluginFactory).to(plugins_1.PluginFactory).inSingletonScope();
            this.app.bind(ioc_1.Identifiers.BasicCredentialsValidator).to(validators_1.Argon2id).inSingletonScope();
            this.app.bind(ioc_1.Identifiers.TokenValidator).to(validators_1.SimpleTokenValidator).inSingletonScope();
            this.app.bind(ioc_1.Identifiers.SnapshotsManager).to(snapshots_manager_1.SnapshotsManager).inSingletonScope();
            this.app.bind(ioc_1.Identifiers.CliManager).to(cli_manager_1.CliManager).inSingletonScope();
            this.app.bind(ioc_1.Identifiers.WorkerManager).to(worker_manager_1.WorkerManager).inSingletonScope();
            const pkg = require("../package.json");
            this.app.bind(ioc_1.Identifiers.CLI).toConstantValue(core_cli_1.ApplicationFactory.make(new core_kernel_1.Container.Container(), pkg));
        }
    }
    /**
     * @returns {Promise<void>}
     * @memberof ServiceProvider
     */
    async boot() {
        if (this.isProcessTypeManager()) {
            if (this.config().get("server.http.enabled")) {
                await this.buildJsonRpcServer("http", ioc_1.Identifiers.HTTP_JSON_RPC);
                await this.app.get(ioc_1.Identifiers.HTTP_JSON_RPC).boot();
                await this.buildServer("http", ioc_1.Identifiers.HTTP);
                await this.app.get(ioc_1.Identifiers.HTTP).boot();
            }
            if (this.config().get("server.https.enabled")) {
                await this.buildJsonRpcServer("https", ioc_1.Identifiers.HTTPS_JSON_RPC);
                await this.app.get(ioc_1.Identifiers.HTTPS_JSON_RPC).boot();
                await this.buildServer("https", ioc_1.Identifiers.HTTPS);
                await this.app.get(ioc_1.Identifiers.HTTPS).boot();
            }
        }
        if (this.config().getRequired("watcher").enabled) {
            this.app.get(ioc_1.Identifiers.EventsListener).boot();
        }
    }
    async dispose() {
        if (this.app.isBound(ioc_1.Identifiers.HTTP_JSON_RPC)) {
            await this.app.get(ioc_1.Identifiers.HTTP_JSON_RPC).dispose();
        }
        if (this.app.isBound(ioc_1.Identifiers.HTTPS_JSON_RPC)) {
            await this.app.get(ioc_1.Identifiers.HTTPS_JSON_RPC).dispose();
        }
        if (this.app.isBound(ioc_1.Identifiers.HTTP)) {
            await this.app.get(ioc_1.Identifiers.HTTP).dispose();
        }
        if (this.app.isBound(ioc_1.Identifiers.HTTPS)) {
            await this.app.get(ioc_1.Identifiers.HTTPS).dispose();
        }
        this.app.get(ioc_1.Identifiers.WatcherDatabaseService).dispose();
        this.app.get(ioc_1.Identifiers.LogsDatabaseService).dispose();
    }
    async required() {
        return false;
    }
    dependencies() {
        if (this.isProcessTypeManager()) {
            return [
                {
                    name: "@arkecosystem/core-snapshots",
                    required: true,
                },
            ];
        }
        return [];
    }
    configSchema() {
        return joi_1.default.object({
            watcher: joi_1.default.object({
                enabled: joi_1.default.bool().required(),
                resetDatabase: joi_1.default.bool().required(),
                storage: joi_1.default.string().required(),
                watch: joi_1.default.object({
                    blocks: joi_1.default.bool().required(),
                    errors: joi_1.default.bool().required(),
                    queries: joi_1.default.bool().required(),
                    queues: joi_1.default.bool().required(),
                    rounds: joi_1.default.bool().required(),
                    schedules: joi_1.default.bool().required(),
                    transactions: joi_1.default.bool().required(),
                    wallets: joi_1.default.bool().required(),
                    webhooks: joi_1.default.bool().required(),
                }).required(),
            }).required(),
            logs: joi_1.default.object({
                enabled: joi_1.default.bool().required(),
                resetDatabase: joi_1.default.bool().required(),
                storage: joi_1.default.string().required(),
                history: joi_1.default.number().integer().min(1).required(),
            }).required(),
            server: joi_1.default.object({
                ip: joi_1.default.number(),
                http: joi_1.default.object({
                    enabled: joi_1.default.bool().required(),
                    host: joi_1.default.string().required(),
                    port: joi_1.default.number().integer().min(1).max(65535).required(),
                }).required(),
                https: joi_1.default.object({
                    enabled: joi_1.default.bool().required(),
                    host: joi_1.default.string().required(),
                    port: joi_1.default.number().integer().min(1).max(65535).required(),
                    tls: joi_1.default.object({
                        key: joi_1.default.string().when("...enabled", { is: true, then: joi_1.default.required() }),
                        cert: joi_1.default.string().when("...enabled", { is: true, then: joi_1.default.required() }),
                    }).required(),
                }).required(),
            }).required(),
            plugins: joi_1.default.object({
                whitelist: joi_1.default.array().items(joi_1.default.string()).required(),
                tokenAuthentication: joi_1.default.object({
                    enabled: joi_1.default.bool().required(),
                    token: joi_1.default.string().when("enabled", { is: true, then: joi_1.default.required() }),
                }).required(),
                basicAuthentication: joi_1.default.object({
                    enabled: joi_1.default.bool().required(),
                    secret: joi_1.default.string().when("enabled", { is: true, then: joi_1.default.required() }),
                    users: joi_1.default.array()
                        .items(joi_1.default.object({
                        username: joi_1.default.string().required(),
                        password: joi_1.default.string().required(),
                    }))
                        .when("enabled", { is: true, then: joi_1.default.required() }),
                }).required(),
            }).required(),
            archiveFormat: joi_1.default.string().valid("zip", "gz").required(),
        }).unknown(true);
    }
    isProcessTypeManager() {
        return this.app.get(core_kernel_1.Container.Identifiers.ConfigFlags).processType === "manager";
    }
    async buildServer(type, id) {
        this.app.bind(id).to(server_1.HttpServer).inSingletonScope();
        const server = this.app.get(id);
        const config = lodash_clonedeep_1.default(this.config().getRequired(`server.${type}`));
        config.port++;
        await server.initialize(`Public API (${type.toUpperCase()})`, {
            ...config,
            ...{
                routes: {
                    cors: true,
                },
            },
        });
        await server.register({
            plugin: handlers_1.default,
        });
    }
    async buildJsonRpcServer(type, id) {
        this.app.bind(id).to(server_1.Server).inSingletonScope();
        const server = this.app.get(id);
        await server.initialize(`Public JSON-RPC API (${type.toUpperCase()})`, {
            ...this.config().get(`server.${type}`),
            ...{
                routes: {
                    cors: true,
                },
            },
        });
    }
}
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=service-provider.js.map