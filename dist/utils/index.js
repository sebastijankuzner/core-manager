"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const api_connection_1 = require("./api-connection");
const http_client_1 = require("./http-client");
const process_1 = require("./process");
const process_actions_1 = require("./process-actions");
exports.Utils = {
    getConnectionData: api_connection_1.getConnectionData,
    getCoreOrForgerProcessName: process_1.getCoreOrForgerProcessName,
    getOnlineProcesses: process_1.getOnlineProcesses,
    HttpClient: http_client_1.HttpClient,
    parseProcessActionResponse: process_actions_1.parseProcessActionResponse,
};
//# sourceMappingURL=index.js.map