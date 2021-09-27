import { Actions } from "../contracts";
interface Params {
    token: string;
    process: string;
}
export declare class Action implements Actions.Action {
    private readonly app;
    name: string;
    schema: {
        type: string;
        properties: {
            token: {
                type: string;
            };
            process: {
                type: string;
            };
        };
    };
    execute(params: Partial<Params>): Promise<any>;
    private getProcessStatus;
    private getSyncingStatus;
}
export {};
