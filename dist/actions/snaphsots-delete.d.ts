import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly filesystem;
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
    execute(params: {
        name: string;
    }): Promise<any>;
    deleteSnapshot(name: string): Promise<void>;
}
