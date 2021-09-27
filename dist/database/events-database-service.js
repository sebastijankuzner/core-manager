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
exports.EventsDatabaseService = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const database_1 = require("./database");
let EventsDatabaseService = class EventsDatabaseService {
    boot() {
        const filename = this.configuration.getRequired("watcher").storage;
        this.database = new database_1.Database(filename, {
            tables: [
                {
                    name: "events",
                    columns: [
                        {
                            name: "id",
                            type: "integer",
                            primary: true,
                            autoincrement: true,
                        },
                        {
                            name: "event",
                            type: "varchar(255)",
                            index: true,
                        },
                        {
                            name: "data",
                            type: "json",
                            index: true,
                        },
                        {
                            name: "timestamp",
                            type: "datetime",
                            default: "CURRENT_TIMESTAMP",
                            index: true,
                        },
                    ],
                },
            ],
        });
        this.database.boot(this.configuration.getRequired("watcher").resetDatabase);
    }
    dispose() {
        this.database.dispose();
    }
    add(event, data = {}) {
        this.database.add("events", {
            event,
            data,
        });
    }
    find(conditions) {
        return this.database.find("events", conditions);
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], EventsDatabaseService.prototype, "configuration", void 0);
EventsDatabaseService = __decorate([
    core_kernel_1.Container.injectable()
], EventsDatabaseService);
exports.EventsDatabaseService = EventsDatabaseService;
//# sourceMappingURL=events-database-service.js.map