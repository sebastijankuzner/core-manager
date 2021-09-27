import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    name: string;
    execute(params: object): Promise<any>;
}
