"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const joi_1 = __importDefault(require("joi"));
const log_archived_1 = require("../controllers/log-archived");
exports.register = (server) => {
    const controller = server.app.app.resolve(log_archived_1.LogArchivedController);
    server.bind(controller);
    server.route({
        method: "GET",
        path: "/log/archived/{id}",
        handler: controller.file,
        options: {
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().required(),
                }),
            },
        },
    });
};
//# sourceMappingURL=log-archived.js.map