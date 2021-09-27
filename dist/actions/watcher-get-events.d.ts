import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly database;
    name: string;
    schema: {
        type: string;
        properties: {
            query: {
                type: string;
                properties: {
                    $limit: {
                        type: string;
                        minimum: number;
                    };
                    $offset: {
                        type: string;
                        minimum: number;
                    };
                };
            };
        };
        required: string[];
    };
    execute(params: {
        query: any;
    }): Promise<any>;
}
