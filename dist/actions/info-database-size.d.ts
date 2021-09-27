import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    name: string;
    execute(): Promise<any>;
    private getDatabaseSize;
}
