"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const manager_config_1 = require("./manager-config");
const manager_log_1 = require("./manager-log");
const manager_restart_1 = require("./manager-restart");
const manager_run_1 = require("./manager-run");
const manager_start_1 = require("./manager-start");
const manager_status_1 = require("./manager-status");
const manager_stop_1 = require("./manager-stop");
exports.Commands = [
    manager_config_1.Command,
    manager_log_1.Command,
    manager_restart_1.Command,
    manager_run_1.Command,
    manager_start_1.Command,
    manager_status_1.Command,
    manager_stop_1.Command,
];
//# sourceMappingURL=index.js.map