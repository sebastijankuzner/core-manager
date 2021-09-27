import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    private readonly filesystem;
    name: string;
    schema: {
        type: string;
        properties: {};
    };
    execute(params: any): Promise<any>;
    private format;
    private updateEnv;
}
