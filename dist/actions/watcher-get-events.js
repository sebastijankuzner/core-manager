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
const events_database_service_1 = require("../database/events-database-service");
let Action = class Action {
    constructor() {
        this.name = "watcher.getEvents";
        this.schema = {
            type: "object",
            properties: {
                query: {
                    type: "object",
                    properties: {
                        $limit: {
                            type: "number",
                            minimum: 0,
                        },
                        $offset: {
                            type: "number",
                            minimum: 0,
                        },
                    },
                },
            },
            required: ["query"],
        };
    }
    async execute(params) {
        return this.database.find(params.query);
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.WatcherDatabaseService),
    __metadata("design:type", events_database_service_1.EventsDatabaseService)
], Action.prototype, "database", void 0);
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=watcher-get-events.js.map