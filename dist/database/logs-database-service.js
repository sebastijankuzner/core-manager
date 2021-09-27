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
exports.LogsDatabaseService = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const dayjs_1 = __importDefault(require("dayjs"));
const database_1 = require("./database");
let LogsDatabaseService = class LogsDatabaseService {
    getDBFilePath() {
        return this.configuration.getRequired("logs").storage;
    }
    getSchema() {
        return {
            tables: [
                {
                    name: "logs",
                    columns: [
                        {
                            name: "id",
                            type: "integer",
                            primary: true,
                            autoincrement: true,
                        },
                        {
                            name: "process",
                            type: "varchar(15)",
                            index: true,
                        },
                        {
                            name: "level",
                            type: "varchar(15)",
                            index: true,
                        },
                        {
                            name: "content",
                            type: "text",
                        },
                        {
                            name: "timestamp",
                            type: "integer",
                            index: true,
                        },
                    ],
                },
            ],
        };
    }
    boot() {
        this.database = new database_1.Database(this.getDBFilePath(), this.getSchema());
        this.database.boot(this.configuration.getRequired("logs").resetDatabase);
    }
    dispose() {
        this.database.dispose();
    }
    add(level, content) {
        if (!this.database.isOpen()) {
            return;
        }
        this.database.add("logs", {
            process: this.configFlags.processType,
            level,
            content,
            timestamp: dayjs_1.default().unix(),
        });
        this.removeOldRecords();
    }
    search(searchParams) {
        const conditions = {
            $order: { id: "DESC" },
        };
        if (searchParams.dateFrom || searchParams.dateTo) {
            conditions.timestamp = {};
            if (searchParams.dateFrom) {
                conditions.timestamp.$gte = searchParams.dateFrom;
            }
            if (searchParams.dateTo) {
                conditions.timestamp.$lte = searchParams.dateTo;
            }
        }
        if (searchParams.levels) {
            conditions.level = {
                $in: searchParams.levels,
            };
        }
        if (searchParams.processes) {
            conditions.process = {
                $in: searchParams.processes,
            };
        }
        if (searchParams.searchTerm) {
            conditions.content = {
                $like: `%${searchParams.searchTerm}%`,
            };
        }
        if (searchParams.limit) {
            conditions.$limit = searchParams.limit;
        }
        if (searchParams.offset) {
            conditions.$offset = searchParams.offset;
        }
        if (searchParams.order && searchParams.order.toUpperCase() === "ASC") {
            conditions.$order.id = "ASC";
        }
        return this.database.find("logs", conditions);
    }
    removeOldRecords() {
        this.database.remove("logs", {
            timestamp: {
                $lte: dayjs_1.default().unix() - this.configuration.getRequired("logs").history * 24 * 60 * 60,
            },
        });
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.ConfigFlags),
    __metadata("design:type", Object)
], LogsDatabaseService.prototype, "configFlags", void 0);
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], LogsDatabaseService.prototype, "configuration", void 0);
LogsDatabaseService = __decorate([
    core_kernel_1.Container.injectable()
], LogsDatabaseService);
exports.LogsDatabaseService = LogsDatabaseService;
//# sourceMappingURL=logs-database-service.js.map