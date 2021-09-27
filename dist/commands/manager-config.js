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
exports.Command = void 0;
const core_cli_1 = require("@arkecosystem/core-cli");
const crypto_1 = require("@arkecosystem/crypto");
const argon2_1 = __importDefault(require("argon2"));
const crypto_2 = __importDefault(require("crypto"));
const fs_extra_1 = require("fs-extra");
const joi_1 = __importDefault(require("joi"));
/**
 * @export
 * @class Command
 * @extends {Commands.Command}
 */
let Command = class Command extends core_cli_1.Commands.Command {
    constructor() {
        super(...arguments);
        /**
         * The console command signature.
         *
         * @type {string}
         * @memberof Command
         */
        this.signature = "manager:config";
        /**
         * The console command description.
         *
         * @type {string}
         * @memberof Command
         */
        this.description = "Update the Manager configuration.";
        this.requiredFlags = ["host", "port"];
    }
    /**
     * Configure the console command.
     *
     * @returns {void}
     * @memberof Command
     */
    configure() {
        this.definition
            .setFlag("token", "The name of the token.", joi_1.default.string().default("ark"))
            .setFlag("network", "The name of the network.", joi_1.default.string().valid(...Object.keys(crypto_1.Networks)))
            .setFlag("host", "The host address of the manager.", joi_1.default.string())
            .setFlag("port", "The port of the manager.", joi_1.default.number())
            .setFlag("authenticationToken", "Secret token for token authentication.", joi_1.default.string())
            .setFlag("username", "Basic authentication username.", joi_1.default.string())
            .setFlag("password", "Basic authentication password.", joi_1.default.string())
            .setFlag("whitelist", "Comma separated IP whitelist .", joi_1.default.string());
    }
    /**
     * Execute the console command.
     *
     * @returns {Promise<void>}
     * @memberof Command
     */
    async execute() {
        if (this.requiredFlags.every((flag) => this.getFlag(flag))) {
            this.updateEnvironmentVariables(this.getFlags());
            await this.updateAppJson(this.getFlags());
            return;
        }
        const response = await this.components.prompt([
            {
                type: "text",
                name: "host",
                message: "What host do you want to use?",
                initial: "0.0.0.0",
            },
            {
                type: "number",
                name: "port",
                message: "What port do you want to use?",
                initial: 4005,
                min: 1,
                max: 65535,
            },
            {
                type: "text",
                name: "whitelist",
                message: "Which IPs can be whitelisted? Separate values with comma. Enter * for all.",
            },
            {
                type: "select",
                name: "authenticationType",
                message: "Which authentication system do you want to use?",
                choices: [
                    { title: "None", value: "none" },
                    { title: "Token", value: "token" },
                    { title: "Basic", value: "basic" },
                ],
                initial: 2,
            },
            {
                type: (prev, values) => {
                    return values.authenticationType === "token" ? "password" : null;
                },
                name: "authenticationToken",
                message: "Enter authentication token:",
            },
            {
                type: (prev, values) => {
                    return values.authenticationType === "basic" ? "text" : null;
                },
                name: "username",
                message: "Enter username:",
            },
            {
                type: (prev, values) => {
                    return values.authenticationType === "basic" ? "password" : null;
                },
                name: "password",
                message: "Enter password:",
            },
            {
                type: "confirm",
                name: "confirm",
                message: "Can you confirm?",
            },
        ]);
        if (!response.confirm) {
            throw new Error("You'll need to confirm the input to continue.");
        }
        this.updateEnvironmentVariables(response);
        await this.updateAppJson(response);
    }
    updateEnvironmentVariables(options) {
        const variables = {
            CORE_MANAGER_HOST: options.host,
            CORE_MANAGER_PORT: options.port,
        };
        const envFile = this.app.getCorePath("config", ".env");
        this.environment.updateVariables(envFile, variables);
    }
    async updateAppJson(options) {
        const appJsonFile = this.app.getCorePath("config", "app.json");
        const appJson = fs_extra_1.readJSONSync(appJsonFile);
        appJson.manager = await this.generateManagerSection(options);
        fs_extra_1.writeJSONSync(appJsonFile, appJson, { spaces: 4 });
    }
    async generateManagerSection(options) {
        const result = {
            plugins: [
                {
                    package: "@arkecosystem/core-logger-pino",
                },
                {
                    package: "@arkecosystem/core-database",
                },
                {
                    package: "@arkecosystem/core-snapshots",
                },
                {
                    package: "@arkecosystem/core-manager",
                },
            ],
        };
        const packageOptions = {
            plugins: {},
        };
        if (options.username && options.password) {
            const secret = this.generateSecret();
            packageOptions.plugins.basicAuthentication = {
                enabled: true,
                secret,
                users: [
                    {
                        username: options.username,
                        password: await argon2_1.default.hash(options.password, {
                            type: argon2_1.default.argon2id,
                            secret: Buffer.from(secret),
                        }),
                    },
                ],
            };
        }
        else if (options.authenticationToken) {
            packageOptions.plugins.tokenAuthentication = {
                enabled: true,
                token: options.authenticationToken,
            };
        }
        if (options.whitelist) {
            packageOptions.plugins.whitelist = options.whitelist.replace(" ", "").split(",");
        }
        if (Object.keys(packageOptions.plugins).length) {
            result.plugins.find((plugin) => plugin.package === "@arkecosystem/core-manager").options = packageOptions;
        }
        return result;
    }
    generateSecret() {
        const buf = Buffer.alloc(64);
        return crypto_2.default.randomFillSync(buf).toString("hex");
    }
};
__decorate([
    core_cli_1.Container.inject(core_cli_1.Container.Identifiers.Environment),
    __metadata("design:type", core_cli_1.Services.Environment)
], Command.prototype, "environment", void 0);
Command = __decorate([
    core_cli_1.Container.injectable()
], Command);
exports.Command = Command;
//# sourceMappingURL=manager-config.js.map