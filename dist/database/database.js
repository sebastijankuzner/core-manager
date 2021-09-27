"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_extra_1 = require("fs-extra");
const conditions = new Map([
    ["$eq", "="],
    ["$ne", "!="],
    ["$lt", "<"],
    ["$lte", "<="],
    ["$gt", ">"],
    ["$gte", ">="],
    ["$like", "LIKE"],
    ["$in", "IN"],
]);
class Database {
    constructor(filename, schema, options = {}) {
        this.filename = filename;
        this.schema = schema;
        this.options = {
            defaultLimit: 100,
            maxLimit: 1000,
            ...options,
        };
        fs_extra_1.ensureFileSync(this.filename);
        this.database = new better_sqlite3_1.default(filename);
    }
    isOpen() {
        return this.database.open;
    }
    boot(flush = false) {
        this.exec(this.createDatabaseSQL());
        if (flush) {
            this.flush();
        }
    }
    dispose() {
        this.database.close();
    }
    flush() {
        for (const table of this.schema.tables) {
            this.database.prepare(`DELETE FROM ${table.name}`).run();
        }
    }
    getAll(tableName, conditions) {
        const table = this.getTable(tableName);
        const result = this.database
            .prepare(`SELECT * FROM ${table.name} ${this.prepareWhere(table, conditions)} ${this.prepareOrderBy(conditions)}`)
            .pluck(false)
            .all();
        return this.transform(table, result);
    }
    getAllIterator(tableName, conditions) {
        const table = this.getTable(tableName);
        return this.database
            .prepare(`SELECT * FROM ${table.name} ${this.prepareWhere(table, conditions)} ${this.prepareOrderBy(conditions)}`)
            .pluck(false)
            .iterate();
    }
    add(tableName, data) {
        const table = this.getTable(tableName);
        this.database.prepare(this.prepareInsertSQL(table, data)).run(this.prepareInsertData(table, data));
    }
    getTotal(tableName, conditions) {
        const table = this.getTable(tableName);
        return this.database
            .prepare(`SELECT COUNT(*) FROM ${table.name} ${this.prepareWhere(table, conditions)}`)
            .get()["COUNT(*)"];
    }
    find(tableName, conditions) {
        const table = this.getTable(tableName);
        const limit = this.prepareLimit(conditions);
        const offset = this.prepareOffset(conditions);
        return {
            total: this.getTotal(tableName, conditions),
            limit,
            offset,
            data: this.transform(table, this.database
                .prepare(`SELECT * FROM ${table.name} ${this.prepareWhere(table, conditions)} ${this.prepareOrderBy(conditions)} LIMIT ${limit} OFFSET ${offset};`)
                .pluck(false)
                .all()),
        };
    }
    remove(tableName, conditions) {
        const table = this.getTable(tableName);
        this.database.exec(`DELETE FROM ${table.name} ${this.prepareWhere(table, conditions)}`);
    }
    getTable(tableName) {
        const table = this.schema.tables.find((table) => table.name === tableName);
        if (!table) {
            throw new Error(`Table ${tableName} does not exists.`);
        }
        return table;
    }
    transform(table, data) {
        const jsonColumns = table.columns.filter((column) => column.type === "json");
        if (jsonColumns.length) {
            return data.map((item) => {
                for (const jsonColumn of jsonColumns) {
                    item[jsonColumn.name] = JSON.parse(item[jsonColumn.name]);
                }
                return item;
            });
        }
        return data;
    }
    prepareInsertData(table, data) {
        const result = {};
        for (const column of this.getInsertColumns(table, data)) {
            if (column.type === "json") {
                result[column.name] = JSON.stringify(data[column.name]);
            }
            else {
                result[column.name] = data[column.name];
            }
        }
        return result;
    }
    prepareInsertSQL(table, data) {
        const columns = this.getInsertColumns(table, data);
        let result = `INSERT INTO ${table.name} (`;
        for (const column of columns) {
            result += column.name;
            if (columns[columns.length - 1] !== column) {
                result += ", ";
            }
        }
        result += ") VALUES (";
        for (const column of columns) {
            if (column.type === "json") {
                result += `json(:${column.name})`;
            }
            else {
                result += `:${column.name}`;
            }
            if (columns[columns.length - 1] !== column) {
                result += ", ";
            }
        }
        result += ")";
        return result;
    }
    getInsertColumns(table, data) {
        const result = [];
        for (const key of Object.keys(data)) {
            const column = table.columns.find((column) => column.name === key);
            if (column) {
                result.push(column);
            }
        }
        return result;
    }
    exec(sql) {
        this.database.exec(sql);
    }
    createDatabaseSQL() {
        let result = "PRAGMA journal_mode = WAL;\n";
        for (const table of this.schema.tables) {
            result += this.createTableSQL(table) + "\n";
        }
        result += this.createIndexesSQL();
        return result;
    }
    createTableSQL(table) {
        let result = `CREATE TABLE IF NOT EXISTS ${table.name} (`;
        for (const column of table.columns) {
            result += this.createColumnSQL(column);
            if (table.columns[table.columns.length - 1] !== column) {
                result += ", ";
            }
        }
        result += ");";
        return result;
    }
    createColumnSQL(column) {
        let result = `${column.name} ${column.type.toUpperCase()}`;
        if (column.primary) {
            result += " PRIMARY KEY";
            /* istanbul ignore else */
            if (column.autoincrement) {
                result += " AUTOINCREMENT";
            }
        }
        if (!column.nullable) {
            result += " NOT NULL";
        }
        if (column.default) {
            result += ` DEFAULT ${column.default}`;
        }
        return result;
    }
    createIndexesSQL() {
        let result = "";
        for (const table of this.schema.tables) {
            for (const column of table.columns) {
                if (column.index) {
                    result += `CREATE INDEX IF NOT EXISTS index_${table.name}_${column.name} ON ${table.name} (${column.name});\n`;
                }
            }
        }
        return result;
    }
    prepareLimit(conditions) {
        if ((conditions === null || conditions === void 0 ? void 0 : conditions.$limit) && typeof conditions.$limit === "number") {
            if (conditions.$limit <= this.options.maxLimit) {
                return conditions.$limit;
            }
            return this.options.maxLimit;
        }
        return this.options.defaultLimit;
    }
    prepareOffset(conditions) {
        if ((conditions === null || conditions === void 0 ? void 0 : conditions.$offset) && typeof conditions.$offset === "number") {
            return conditions.$offset;
        }
        return 0;
    }
    prepareOrderBy(conditions) {
        let result = "";
        if (conditions && conditions.$order && Object.keys(conditions.$order).length >= 1) {
            result = "ORDER BY";
            const keys = Object.keys(conditions.$order);
            for (const key of keys) {
                result += ` ${key} ${conditions.$order[key] === "DESC" ? "DESC" : "ASC"}`;
                if (keys[keys.length - 1] !== key) {
                    result += ",";
                }
            }
        }
        return result;
    }
    prepareWhere(table, conditions) {
        let query = "";
        const extractedConditions = this.extractWhereConditions(table, conditions);
        if (extractedConditions.length > 0) {
            query += "WHERE " + extractedConditions[0];
        }
        for (let i = 1; i < extractedConditions.length; i++) {
            query += " AND " + extractedConditions[i];
        }
        return query;
    }
    extractWhereConditions(table, conditions) {
        let result = [];
        if (!conditions) {
            return [];
        }
        for (const key of Object.keys(conditions)) {
            if (["$offset", "$limit", "$order"].includes(key)) {
                continue;
            }
            const column = table.columns.find((column) => column.name === key);
            if (!column) {
                throw new Error(`Column ${key} does not exist on table ${table.name}.`);
            }
            if (column.type === "json") {
                result = [
                    ...result,
                    ...this.extractConditions(conditions[key], "$").map((x) => this.conditionLineToSQLCondition(x, key)),
                ];
            }
            else {
                result = [
                    ...result,
                    ...this.extractConditions(conditions[key], key).map((x) => this.conditionLineToSQLCondition(x)),
                ];
            }
        }
        return result;
    }
    prepareValue(value) {
        if (Array.isArray(value)) {
            let result = "(";
            for (const item of value) {
                if (typeof item === "number") {
                    result += `${item}`;
                }
                else {
                    result += `'${item}'`;
                }
                if (value[value.length - 1] !== item) {
                    result += ",";
                }
            }
            result += ")";
            return result;
        }
        return value;
    }
    useQuote(value) {
        if (Array.isArray(value)) {
            return false;
        }
        return typeof value !== "number";
    }
    conditionLineToSQLCondition(conditionLine, jsonExtractProperty) {
        const useQuote = this.useQuote(conditionLine.value);
        if (jsonExtractProperty) {
            // Example: json_extract(data, '$.publicKey') = '0377f81a18d25d77b100cb17e829a72259f08334d064f6c887298917a04df8f647'
            // prettier-ignore
            return `json_extract(${jsonExtractProperty}, '${conditionLine.property}') ${conditions.get(conditionLine.condition)} ${useQuote ? "'" : ""}${this.prepareValue(conditionLine.value)}${useQuote ? "'" : ""}`;
        }
        // Example: event LIKE 'wallet'
        // prettier-ignore
        return `${conditionLine.property} ${conditions.get(conditionLine.condition)} ${useQuote ? "'" : ""}${this.prepareValue(conditionLine.value)}${useQuote ? "'" : ""}`;
    }
    extractConditions(data, property) {
        let result = [];
        /* istanbul ignore next */
        if (!data) {
            /* istanbul ignore next */
            return [];
        }
        if (typeof data !== "object") {
            result.push({
                property: `${property}`,
                condition: "$eq",
                value: data,
            });
            return result;
        }
        for (const key of Object.keys(data)) {
            if (key.startsWith("$")) {
                result.push({
                    property: property,
                    condition: key,
                    value: data[key],
                });
            }
            else {
                result = [...result, ...this.extractConditions(data[key], `${property}.${key}`)];
            }
        }
        return result;
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map