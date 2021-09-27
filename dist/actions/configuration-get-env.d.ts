import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    private readonly filesystem;
    name: string;
    execute(params: any): Promise<any>;
    private getEnvFile;
    private parseEnvContent;
}
