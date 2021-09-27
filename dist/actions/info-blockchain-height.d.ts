import { Actions } from "../contracts";
export declare class Action implements Actions.Action {
    name: string;
    execute(params: any): Promise<any>;
    private getNodeHeight;
    private getRandomPeer;
    private prepareRandomNodeHeight;
}
