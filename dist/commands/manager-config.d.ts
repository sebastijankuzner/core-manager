import { Commands } from "@arkecosystem/core-cli";
/**
 * @export
 * @class Command
 * @extends {Commands.Command}
 */
export declare class Command extends Commands.Command {
    /**
     * @private
     * @type {Environment}
     * @memberof Command
     */
    private readonly environment;
    /**
     * The console command signature.
     *
     * @type {string}
     * @memberof Command
     */
    signature: string;
    /**
     * The console command description.
     *
     * @type {string}
     * @memberof Command
     */
    description: string;
    private readonly requiredFlags;
    /**
     * Configure the console command.
     *
     * @returns {void}
     * @memberof Command
     */
    configure(): void;
    /**
     * Execute the console command.
     *
     * @returns {Promise<void>}
     * @memberof Command
     */
    execute(): Promise<void>;
    private updateEnvironmentVariables;
    private updateAppJson;
    private generateManagerSection;
    private generateSecret;
}
