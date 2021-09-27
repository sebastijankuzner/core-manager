import { Contracts, Providers } from "@arkecosystem/core-kernel";
export declare class ServiceProvider extends Providers.ServiceProvider {
    register(): Promise<void>;
    /**
     * @returns {Promise<void>}
     * @memberof ServiceProvider
     */
    boot(): Promise<void>;
    dispose(): Promise<void>;
    required(): Promise<boolean>;
    dependencies(): Contracts.Kernel.PluginDependency[];
    configSchema(): object;
    private isProcessTypeManager;
    private buildServer;
    private buildJsonRpcServer;
}
