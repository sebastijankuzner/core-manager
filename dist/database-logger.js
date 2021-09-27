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
exports.DatabaseLogger = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const events_database_service_1 = require("./database/events-database-service");
let DatabaseLogger = class DatabaseLogger {
    log(level, message, queryRunner) {
        this.databaseService.add(`database.${level}`, message);
    }
    logMigration(message, queryRunner) {
        this.databaseService.add(`database.migration`, message);
    }
    logQuery(query, parameters, queryRunner) {
        this.databaseService.add(`database.query.log`, {
            query: query,
            parameters: parameters,
        });
    }
    logQueryError(error, query, parameters, queryRunner) {
        this.databaseService.add(`database.query.error`, {
            error: error,
            query: query,
            parameters: parameters,
        });
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        this.databaseService.add(`database.query.slow`, {
            time: time,
            query: query,
            parameters: parameters,
        });
    }
    logSchemaBuild(message, queryRunner) {
        this.databaseService.add(`database.schemaBuild`, message);
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.WatcherDatabaseService),
    __metadata("design:type", events_database_service_1.EventsDatabaseService)
], DatabaseLogger.prototype, "databaseService", void 0);
DatabaseLogger = __decorate([
    core_kernel_1.Container.injectable()
], DatabaseLogger);
exports.DatabaseLogger = DatabaseLogger;
//# sourceMappingURL=database-logger.js.map