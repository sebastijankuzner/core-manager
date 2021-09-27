import { Result } from "./database";
export declare class EventsDatabaseService {
    private readonly configuration;
    private database;
    boot(): void;
    dispose(): void;
    add(event: string, data?: any): void;
    find(conditions?: any): Result;
}
