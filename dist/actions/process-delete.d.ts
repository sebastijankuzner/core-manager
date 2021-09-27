import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    name: string;
    schema: {
        type: string;
        properties: {
            name: {
                type: string;
            };
        };
        required: string[];
    };
    execute(params: any): Promise<any>;
    private deleteProcess;
}
