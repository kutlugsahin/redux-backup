import { Store, ReduxBackupPayload } from "../types";
export default class MemoryStore<TState> implements Store<TState> {
    private store;
    constructor();
    backup(state: TState, { label }: ReduxBackupPayload): void;
    restore(state: TState, { label }: ReduxBackupPayload): any;
    deleteBackup(state: TState, { label }: ReduxBackupPayload): void;
}
