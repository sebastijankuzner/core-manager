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
exports.WorkerManager = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const dayjs_1 = __importDefault(require("dayjs"));
const worker_threads_1 = require("worker_threads");
class ResolveRejectOnce {
    constructor(resolveMethod, rejectMethod, onFinish) {
        this.resolveMethod = resolveMethod;
        this.rejectMethod = rejectMethod;
        this.onFinish = onFinish;
        this.counter = 0;
    }
    resolve(logFileName) {
        if (this.counter++ === 0) {
            this.resolveMethod(logFileName);
            this.onFinish();
        }
    }
    reject(err) {
        if (this.counter++ === 0) {
            this.rejectMethod(err);
            this.onFinish();
        }
    }
}
let WorkerManager = class WorkerManager {
    constructor() {
        this.runningWorkers = 0;
    }
    canRun() {
        return this.runningWorkers === 0;
    }
    generateLog(databaseFilePath, schema, query) {
        return new Promise((resolve, reject) => {
            this.runningWorkers++;
            let workerData;
            if (this.configuration.getRequired("archiveFormat") === "zip") {
                workerData = {
                    archiveFormat: "zip",
                    databaseFilePath,
                    schema,
                    query,
                    logFileName: dayjs_1.default().format("YYYY-MM-DD_HH-mm-ss") + ".zip",
                };
            }
            else {
                workerData = {
                    archiveFormat: "gz",
                    databaseFilePath,
                    schema,
                    query,
                    logFileName: dayjs_1.default().format("YYYY-MM-DD_HH-mm-ss") + ".log.gz",
                };
            }
            const worker = new worker_threads_1.Worker(__dirname + "/worker.js", { workerData });
            const resolver = new ResolveRejectOnce(resolve, reject, () => {
                this.runningWorkers--;
            });
            worker
                .on("exit", () => {
                resolver.resolve(workerData.logFileName);
            })
                .on("error", async (err) => {
                resolver.reject(err);
            });
        });
    }
};
__decorate([
    core_kernel_1.Container.inject(core_kernel_1.Container.Identifiers.PluginConfiguration),
    core_kernel_1.Container.tagged("plugin", "@arkecosystem/core-manager"),
    __metadata("design:type", core_kernel_1.Providers.PluginConfiguration)
], WorkerManager.prototype, "configuration", void 0);
WorkerManager = __decorate([
    core_kernel_1.Container.injectable()
], WorkerManager);
exports.WorkerManager = WorkerManager;
//# sourceMappingURL=worker-manager.js.map