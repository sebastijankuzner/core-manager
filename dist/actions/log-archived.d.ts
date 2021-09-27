import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly app;
    private readonly filesystem;
    private readonly configuration;
    name: string;
    execute(params: object): Promise<any>;
    private getArchiveInfo;
    private getArchivedLogs;
    private getServerUrl;
}
