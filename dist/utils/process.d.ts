import { Services } from "@arkecosystem/core-cli";
export declare const getOnlineProcesses: (processManager: Services.ProcessManager) => {
    name: string;
}[];
export declare const getCoreOrForgerProcessName: (processes: {
    name: string;
}[], token?: string) => string;
