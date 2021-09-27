import { Types } from "@arkecosystem/core-kernel";
import { Server } from "./server";
export declare class HttpServer extends Server {
    initialize(name: string, serverOptions: Types.JsonObject): Promise<void>;
}
