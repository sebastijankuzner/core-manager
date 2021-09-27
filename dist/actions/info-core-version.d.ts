import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    private readonly cli;
    name: string;
    execute(params: object): Promise<any>;
    private getLatestVersion;
    private getChannel;
}
