import { Actions } from "../contracts";
import { SearchParams } from "../database/logs-database-service";
export declare class Action implements Actions.Action {
    private readonly database;
    name: string;
    schema: {
        type: string;
        properties: {
            dateFrom: {
                type: string;
            };
            dateTo: {
                type: string;
            };
            levels: {
                type: string;
                items: {
                    type: string;
                };
            };
            processes: {
                type: string;
                items: {
                    type: string;
                };
            };
            searchTerm: {
                type: string;
            };
            limit: {
                type: string;
            };
            offset: {
                type: string;
            };
            order: {
                type: string;
            };
        };
        additionalProperties: boolean;
    };
    execute(params: SearchParams): Promise<any>;
}
