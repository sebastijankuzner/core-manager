export declare class CliManager {
    private readonly cli;
    runCommand(name: string, args?: string): Promise<void>;
    private discoverCommands;
}
