"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoreOrForgerProcessName = exports.getOnlineProcesses = void 0;
exports.getOnlineProcesses = (processManager) => {
    return processManager.list().filter((x) => processManager.isOnline(x.name));
};
exports.getCoreOrForgerProcessName = (processes, token = "ark") => {
    const process = processes.find((x) => x.name === `${token}-forger` || x.name === `${token}-core`);
    if (!process) {
        throw new Error("Process with name ark-forger or ark-core is not online");
    }
    return process.name;
};
//# sourceMappingURL=process.js.map