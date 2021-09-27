import { Contracts, Types } from "@arkecosystem/core-kernel";
import { Server as HapiServer, ServerInjectOptions, ServerInjectResponse } from "@hapi/hapi";
import { Plugins } from "../contracts";
export declare class Server {
    protected readonly app: Contracts.Kernel.Application;
    protected readonly logger: Contracts.Kernel.Logger;
    protected readonly pluginFactory: Plugins.PluginFactory;
    protected server: HapiServer;
    protected name: string;
    initialize(name: string, serverOptions: Types.JsonObject): Promise<void>;
    register(plugins: any | any[]): Promise<void>;
    inject(options: string | ServerInjectOptions): Promise<ServerInjectResponse>;
    boot(): Promise<void>;
    dispose(): Promise<void>;
    protected getServerOptions(options: Record<string, any>): object;
    private getRoute;
}
