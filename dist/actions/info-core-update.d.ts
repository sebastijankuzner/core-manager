import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly cliManager;
    name: string;
    execute(params: object): Promise<any>;
}
