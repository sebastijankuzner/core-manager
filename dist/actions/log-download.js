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
const logs_database_service_1 = require("../database/logs-database-service");
const ioc_1 = require("../ioc");
const worker_manager_1 = require("../workers/worker-manager");
let Action = class Action {
    constructor() {
        this.name = "log.download";
        this.schema = {
            type: "object",
            properties: {
                dateFrom: {
                    type: "number",
                },
                dateTo: {
                    type: "number",
                },
                levels: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
                processes: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            },
            required: ["dateFrom", "dateTo"],
        };
    }
    async execute(params) {
        if (!this.workerManager.canRun()) {
            throw new Error("Previous log generation is still in progress.");
        }
        return this.workerManager.generateLog(this.database.getDBFilePath(), this.database.getSchema(), this.prepareQueryConditions(params));
    }
    prepareQueryConditions(params) {
        const query = {
            timestamp: {
                $lte: params.dateTo,
                $gte: params.dateFrom,
            },
            $order: {
                id: "ASC",
            },
        };
        if (params.levels) {
            // @ts-ignore
            query.level = {
                $in: params.levels,
            };
        }
        if (params.processes) {
            // @ts-ignore
            query.process = {
                $in: params.processes,
            };
        }
        return query;
    }
};
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.LogsDatabaseService),
    __metadata("design:type", logs_database_service_1.LogsDatabaseService)
], Action.prototype, "database", void 0);
__decorate([
    core_kernel_1.Container.inject(ioc_1.Identifiers.WorkerManager),
    __metadata("design:type", worker_manager_1.WorkerManager)
], Action.prototype, "workerManager", void 0);
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=log-download.js.map