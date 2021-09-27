import BetterSqlite3 from "better-sqlite3";
interface Options {
    defaultLimit: number;
    maxLimit: number;
}
export interface Column {
    name: string;
    type: string;
    primary?: boolean;
    autoincrement?: boolean;
    nullable?: boolean;
    default?: string;
    index?: boolean;
}
export interface Table {
    name: string;
    columns: Column[];
}
export interface Schema {
    tables: Table[];
}
export interface Result {
    total: number;
    limit: number;
    offset: number;
    data: any[];
}
export declare class Database {
    private readonly filename;
    protected readonly schema: Schema;
    protected options: Options;
    protected database: BetterSqlite3.Database;
    constructor(filename: string, schema: Schema, options?: Partial<Options>);
    isOpen(): boolean;
    boot(flush?: boolean): void;
    dispose(): void;
    flush(): void;
    getAll(tableName: string, conditions?: any): any[];
    getAllIterator(tableName: string, conditions?: any): IterableIterator<any>;
    add(tableName: string, data: any): void;
    getTotal(tableName: string, conditions?: any): number;
    find(tableName: string, conditions?: any): Result;
    remove(tableName: string, conditions?: any): void;
    private getTable;
    private transform;
    private prepareInsertData;
    private prepareInsertSQL;
    private getInsertColumns;
    private exec;
    private createDatabaseSQL;
    private createTableSQL;
    private createColumnSQL;
    private createIndexesSQL;
    private prepareLimit;
    private prepareOffset;
    private prepareOrderBy;
    private prepareWhere;
    private extractWhereConditions;
    private prepareValue;
    private useQuote;
    private conditionLineToSQLCondition;
    private extractConditions;
}
export {};
