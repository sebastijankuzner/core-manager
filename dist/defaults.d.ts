export declare const defaults: {
    watcher: {
        enabled: boolean;
        resetDatabase: boolean;
        storage: string;
        watch: {
            blocks: boolean;
            errors: boolean;
            queries: boolean;
            queues: boolean;
            rounds: boolean;
            schedules: boolean;
            transactions: boolean;
            wallets: boolean;
            webhooks: boolean;
        };
    };
    logs: {
        enabled: boolean;
        resetDatabase: boolean;
        storage: string;
        history: number;
    };
    server: {
        ip: string | undefined;
        http: {
            enabled: boolean;
            host: string;
            port: string | number;
        };
        https: {
            enabled: boolean;
            host: string;
            port: string | number;
            tls: {
                key: string | undefined;
                cert: string | undefined;
            };
        };
    };
    plugins: {
        whitelist: string[];
        tokenAuthentication: {
            enabled: boolean;
        };
        basicAuthentication: {
            enabled: boolean;
            secret: string;
            users: never[];
        };
    };
    archiveFormat: string;
};
