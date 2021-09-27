"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const core_kernel_1 = require("@arkecosystem/core-kernel");
const utils_1 = require("../utils");
let Action = class Action {
    constructor() {
        this.name = "info.blockchainHeight";
    }
    async execute(params) {
        let response = {
            height: await this.getNodeHeight(utils_1.Utils.getConnectionData()),
        };
        try {
            response = {
                ...response,
                ...(await this.prepareRandomNodeHeight()),
            };
        }
        catch (e) { }
        return response;
    }
    async getNodeHeight(connectionData) {
        const httpClient = new utils_1.Utils.HttpClient(connectionData);
        const response = await httpClient.get("/api/blockchain");
        return response.data.block.height;
    }
    async getRandomPeer() {
        const httpClient = new utils_1.Utils.HttpClient(utils_1.Utils.getConnectionData());
        const response = await httpClient.get("/api/peers");
        const data = response.data;
        if (data.length) {
            return data[Math.floor(Math.random() * data.length)];
        }
        throw new Error("No peers found.");
    }
    async prepareRandomNodeHeight() {
        const peer = await this.getRandomPeer();
        return {
            randomNodeHeight: peer.height,
            randomNodeIp: peer.ip,
        };
    }
};
Action = __decorate([
    core_kernel_1.Container.injectable()
], Action);
exports.Action = Action;
//# sourceMappingURL=info-blockchain-height.js.map