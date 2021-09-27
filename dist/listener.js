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
exports.Listener = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const events_database_service_1 = require("./database/events-database-service");
let Listener = class Listener {
    boot() {
        this.events.listen("*", {
            handle: (data) => {
                this.handleEvents(data);
            },
        });
    }
    handleEvents(data) {
        if (this.canAddEvent(data.name.toString())) {
            this.databaseService.add(data.name.toString(), data.data);
        }
    }
    canAddEvent(name) {
        if (name.startsWith("block") && !this.configuration.getRequired("watcher.watch.blocks")) {
            return false;
        }
        if (name.startsWith("log.error") && !this.configuration.getRequired("watcher.watch.errors")) {
            return false;
        }
        if (name.startsWith("queue") && !this.configuration.getRequired("watcher.watch.queues")) {
            return false;
        }
        if (name.startsWith("round") && !this.configuration.getRequired("watcher.watch.rounds")) {
            return false;
        }
        if (name.startsWith("schedule") && !this.configuration.getRequired("watcher.watch.schedules")) {
            return false;
        }
        if (name.startsWith("transaction") && !this.configuration.getRequired("watcher.watch.transactions")) {
            return false;
        }
        if (name.startsWith("webhooks") && !this.configuration.getRequired("watcher.watch.webhooks")) {
            return false;
        }
        return true;
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], Listener.prototype, "configuration", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.WatcherDatabaseService),
    __metadata("design:type", events_database_service_1.EventsDatabaseService)
], Listener.prototype, "databaseService", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.EventDispatcherService),
    __metadata("design:type", Object)
], Listener.prototype, "events", void 0);
Listener = __decorate([
    core_kernel_1.Container.injectable()
], Listener);
exports.Listener = Listener;
//# sourceMappingURL=listener.js.map