import { Actions } from "./contracts";
export declare class ActionReader {
    private readonly app;
    discoverActions(): Actions.Method[];
    private prepareMethod;
}
