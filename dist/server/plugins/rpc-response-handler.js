"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcResponseHandler = void 0;
const getRpcError = (httpResponseCode) => {
    if (httpResponseCode === 401) {
        return {
            code: -32001,
            message: "These credentials do not match our records",
        };
    }
    if (httpResponseCode === 403) {
        return {
            code: -32003,
            message: "Forbidden",
        };
    }
    return {
        code: -32603,
        message: "Internal server error",
    };
};
exports.rpcResponseHandler = {
    name: "rcpResponseHandler",
    version: "0.1.0",
    register: (server) => {
        server.ext({
            type: "onPreResponse",
            method(request, h) {
                const response = request.response;
                if (!response.isBoom) {
                    return h.continue;
                }
                return h.response({
                    jsonrpc: "2.0",
                    error: getRpcError(response.output.statusCode),
                    id: null,
                });
            },
        });
    },
};
//# sourceMappingURL=rpc-response-handler.js.map