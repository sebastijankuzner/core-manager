import { Schema } from "../database/database";
export declare class WorkerManager {
    private readonly configuration;
    private runningWorkers;
    canRun(): Boolean;
    generateLog(databaseFilePath: string, schema: Schema, query: any): Promise<string>;
}
