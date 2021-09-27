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
exports.CliManager = void 0;
const Cli = __importStar(require("@arkecosystem/core-cli"));
const core_kernel_1 = require("@arkecosystem/core-kernel");
const ioc_1 = require("../ioc");
const path_1 = require("path");
let CliManager = class CliManager {
    async runCommand(name, args = "") {
        const commands = this.discoverCommands();
        const command = commands[name];
        if (!command) {
            throw new Error(`Command ${name} does not exists.`);
        }
        const splitArgs = args.replace(/\s+/g, " ").split(" ");
        const argv = [name, ...splitArgs];
        command.register(argv);
        await command.run();
    }
    discoverCommands() {
        const discoverer = this.cli.resolve(Cli.Commands.DiscoverCommands);
        return discoverer.within(path_1.join(path_1.dirname(require.resolve("@arkecosystem/core")), "commands"));
    }
};
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.CLI),
    __metadata("design:type", Cli.Application)
], CliManager.prototype, "cli", void 0);
CliManager = __decorate([
    core_kernel_1.Container.injectable()
], CliManager);
exports.CliManager = CliManager;
//# sourceMappingURL=cli-manager.js.map