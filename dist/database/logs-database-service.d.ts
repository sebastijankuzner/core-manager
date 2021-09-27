import { Result, Schema } from "./database";
export interface LogsResult {
    id: number;
    process: string;
    level: string;
    content: string;
    timestamp: number;
}
export interface SearchParams {
    dateFrom?: number;
    dateTo?: number;
    searchTerm?: string;
    levels?: string[];
    processes?: string[];
    limit?: number;
    offset?: number;
    order?: string;
}
export declare class LogsDatabaseService {
    private readonly configFlags;
    private readonly configuration;
    private database;
    getDBFilePath(): string;
    getSchema(): Schema;
    boot(): void;
    dispose(): void;
    add(level: string, content: string): void;
    search(searchParams: SearchParams): Result;
    private removeOldRecords;
}
