import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly cliManager;
    name: string;
    schema: {
        type: string;
        properties: {
            name: {
                type: string;
            };
            args: {
                type: string;
            };
        };
        required: string[];
    };
    execute(params: {
        name: string;
        args: string;
    }): Promise<any>;
}
