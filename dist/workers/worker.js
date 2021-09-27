"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const generate_log_factory_1 = require("./generate-log-factory");
const main = async () => {
    const action = generate_log_factory_1.generateLogFactory(worker_threads_1.workerData);
    await action.execute();
};
main();
//# sourceMappingURL=worker.js.map