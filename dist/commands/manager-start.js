"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const core_cli_1 = require("@arkecosystem/core-cli");
const crypto_1 = require("@arkecosystem/crypto");
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
        this.signature = "manager:start";
        /**
         * The console command description.
         *
         * @type {string}
         * @memberof Command
         */
        this.description = "Start the Manger process.";
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
            .setFlag("env", "", joi_1.default.string().default("production"))
            .setFlag("daemon", "Start the Core process as a daemon.", joi_1.default.boolean().default(true));
    }
    /**
     * Execute the console command.
     *
     * @returns {Promise<void>}
     * @memberof Command
     */
    async execute() {
        const flags = { ...this.getFlags() };
        this.actions.abortRunningProcess(`${flags.token}-manager`);
        await this.actions.daemonizeProcess({
            name: `${flags.token}-manager`,
            script: require.main.filename,
            args: `manager:run ${core_cli_1.Utils.castFlagsToString(flags, ["daemon"])}`,
        }, flags);
    }
};
Command = __decorate([
    core_cli_1.Container.injectable()
], Command);
exports.Command = Command;
//# sourceMappingURL=manager-start.js.map