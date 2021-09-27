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
        this.signature = "manager:log";
        /**
         * The console command description.
         *
         * @type {string}
         * @memberof Command
         */
        this.description = "Display the Manager process log.";
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
            .setFlag("error", "Only display the error output.", joi_1.default.boolean())
            .setFlag("lines", "The number of lines to output.", joi_1.default.number().default(15));
    }
    /**
     * Execute the console command.
     *
     * @returns {Promise<void>}
     * @memberof Command
     */
    async execute() {
        await this.app
            .get(core_cli_1.Container.Identifiers.ProcessFactory)(this.getFlag("token"), "manager")
            .log(this.getFlag("error"), this.getFlag("lines"));
    }
};
Command = __decorate([
    core_cli_1.Container.injectable()
], Command);
exports.Command = Command;
//# sourceMappingURL=manager-log.js.map