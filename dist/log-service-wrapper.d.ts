import { Contracts } from "@arkecosystem/core-kernel";
import { LogsDatabaseService } from "./database/logs-database-service";
export declare class LogServiceWrapper implements Contracts.Kernel.Logger {
    private logger;
    private databaseService;
    constructor(logger: Contracts.Kernel.Logger, databaseService: LogsDatabaseService);
    make(options?: any): Promise<Contracts.Kernel.Logger>;
    emergency(message: string): void;
    alert(message: string): void;
    critical(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    notice(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    suppressConsoleOutput(suppress: boolean): void;
}
