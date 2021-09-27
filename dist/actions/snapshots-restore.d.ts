import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    private readonly snapshotManager;
    private readonly filesystem;
    name: string;
    schema: {
        type: string;
        properties: {
            name: {
                type: string;
            };
            truncate: {
                type: string;
            };
            verify: {
                type: string;
            };
        };
        required: string[];
    };
    execute(params: {
        name: string;
        truncate?: boolean;
        verify?: boolean;
    }): Promise<any>;
}
