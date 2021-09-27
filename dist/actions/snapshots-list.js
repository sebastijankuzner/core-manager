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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const path_1 = require("path");
let Action = class Action {
    constructor() {
        this.name = "snapshots.list";
    }
    async execute(params) {
        return await this.getSnapshots();
    }
    async getSnapshotInfo(snapshot) {
        const response = {
            name: path_1.basename(snapshot),
            size: 0,
        };
        for (const file of ["blocks", "transactions", "rounds", "meta.json"]) {
            response.size += await this.filesystem.size(path_1.join(snapshot, file));
        }
        response.size = Math.round(response.size / 1024);
        return response;
    }
    async getSnapshots() {
        const snapshotsDir = `${process.env.CORE_PATH_DATA}/snapshots/`;
        const snapshots = await this.filesystem.directories(snapshotsDir);
        const response = [];
        for (const snapshot of snapshots) {
            try {
                response.push(await this.getSnapshotInfo(snapshot));
            }
            catch { }
        }
        return response;
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.FilesystemService),
    __metadata("design:type", Object)
], Action.prototype, "filesystem", void 0);
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=snapshots-list.js.map