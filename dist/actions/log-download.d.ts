import { Actions } from "../contracts";
interface Params {
    dateFrom: number;
    dateTo: number;
    levels: string[];
    processes?: string[];
}
export declare class Action implements Actions.Action {
    private readonly database;
    private readonly workerManager;
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
        };
        required: string[];
    };
    execute(params: Params): Promise<any>;
    private prepareQueryConditions;
}
export {};
