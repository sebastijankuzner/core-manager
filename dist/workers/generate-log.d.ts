/// <reference types="node" />
import { Writable } from "stream";
import { GenerateLog as GenerateLogContracts } from "../contracts";
import { Database } from "../database/database";
export declare class GenerateLog implements GenerateLogContracts.GenerateLog {
    protected readonly options: GenerateLogContracts.GenerateLogOptions;
    protected readonly database: Database;
    constructor(options: GenerateLogContracts.GenerateLogOptions);
    execute(): Promise<void>;
    protected getFilePath(): string;
    protected getTempFilePath(): string;
    protected prepareOutputStream(): Writable;
    protected moveArchive(): void;
    protected removeTempFiles(): void;
}
