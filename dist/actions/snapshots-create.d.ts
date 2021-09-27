import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    private readonly snapshotManager;
    name: string;
    schema: {
        type: string;
        properties: {
            codec: {
                type: string;
            };
            skipCompression: {
                type: string;
            };
            start: {
                type: string;
            };
            end: {
                type: string;
            };
        };
    };
    execute(params: any): Promise<any>;
}
