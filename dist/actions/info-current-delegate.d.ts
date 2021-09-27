import { Actions } from "../contracts";
interface Params {
    token: string;
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
        };
    };
    execute(params: Partial<Params>): Promise<any>;
    private getCurrentDelegate;
}
export {};
