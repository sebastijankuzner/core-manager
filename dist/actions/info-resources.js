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
exports.Action = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const df_1 = __importDefault(require("@sindresorhus/df"));
const systeminformation_1 = __importDefault(require("systeminformation"));
let Action = class Action {
    constructor() {
        this.name = "info.resources";
    }
    async execute(params) {
        return {
            cpu: await this.prepareCpuData(),
            ram: await this.prepareMemData(),
            disk: await this.prepareFilesystemsData(),
        };
    }
    async prepareCpuData() {
        const cpuLoad = await systeminformation_1.default.currentLoad();
        return {
            total: 100,
            used: cpuLoad.currentLoad,
            available: 100 - cpuLoad.currentLoad,
        };
    }
    async prepareMemData() {
        const mem = await systeminformation_1.default.mem();
        return {
            total: this.convert(mem.total),
            used: this.convert(mem.active),
            available: this.convert(mem.available),
        };
    }
    async prepareFilesystemsData() {
        const projectFs = await this.getProjectFilesystem();
        const disk = (await systeminformation_1.default.fsSize()).find((disk) => disk.fs === projectFs);
        return {
            filesystem: disk.fs,
            total: this.convert(disk.size),
            used: this.convert(disk.used),
            available: this.convert(disk.size - disk.used),
            mountpoint: disk.mount,
        };
    }
    async getProjectFilesystem() {
        return (await df_1.default.file(__dirname)).filesystem;
    }
    convert(sizeInBytes) {
        return sizeInBytes / 1024;
    }
};
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=info-resources.js.map