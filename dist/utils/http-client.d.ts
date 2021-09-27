import { ConnectionData } from "../contracts/http-client";
export declare class HttpClient {
    private connectionData;
    constructor(connectionData: ConnectionData);
    get(path: string): Promise<any>;
}
