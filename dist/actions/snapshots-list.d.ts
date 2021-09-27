import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    private readonly filesystem;
    name: string;
    execute(params: object): Promise<any>;
    private getSnapshotInfo;
    private getSnapshots;
}
