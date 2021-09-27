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
exports.SnapshotsManager = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
let SnapshotsManager = class SnapshotsManager {
    async dump(options) {
        if (this.processInAction) {
            throw new Error(`Process ${this.processInAction} is executing`);
        }
        this.processInAction = "create";
        this.snapshotService.dump(options).finally(() => {
            this.processInAction = undefined;
        });
    }
    async restore(options) {
        if (this.processInAction) {
            throw new Error(`Process ${this.processInAction} is executing`);
        }
        this.processInAction = "restore";
        this.snapshotService.restore(options).finally(() => {
            this.processInAction = undefined;
        });
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.SnapshotService),
    __metadata("design:type", Object)
], SnapshotsManager.prototype, "snapshotService", void 0);
SnapshotsManager = __decorate([
    core_kernel_1.Container.injectable()
], SnapshotsManager);
exports.SnapshotsManager = SnapshotsManager;
//# sourceMappingURL=snapshots-manager.js.map