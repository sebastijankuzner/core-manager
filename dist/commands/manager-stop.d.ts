import { Commands } from "@arkecosystem/core-cli";
/**
 * @export
 * @class Command
 * @extends {Commands.Command}
 */
export declare class Command extends Commands.Command {
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
}
