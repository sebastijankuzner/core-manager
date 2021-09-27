import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    name: string;
    execute(params: any): Promise<any>;
    private getProcessList;
}
