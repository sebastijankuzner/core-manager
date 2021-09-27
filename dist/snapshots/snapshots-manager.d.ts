import { Contracts } from "@arkecosystem/core-kernel";
export declare class SnapshotsManager {
    private readonly snapshotService;
    private processInAction?;
    dump(options: Contracts.Snapshot.DumpOptions): Promise<void>;
    restore(options: Contracts.Snapshot.RestoreOptions): Promise<void>;
}
