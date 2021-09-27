"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionData = void 0;
exports.getConnectionData = () => {
    if (!process.env.CORE_API_DISABLED) {
        return {
            ip: process.env.CORE_API_HOST || "0.0.0.0",
            port: process.env.CORE_API_PORT ? parseInt(process.env.CORE_API_PORT) : 4003,
            protocol: "http",
        };
    }
    return {
        ip: process.env.CORE_API_SSL_HOST || "0.0.0.0",
        port: process.env.CORE_API_SSL_PORT ? parseInt(process.env.CORE_API_SSL_PORT) : 8443,
        protocol: "https",
    };
};
//# sourceMappingURL=api-connection.js.map