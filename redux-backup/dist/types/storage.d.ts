import { BackupRestorePayload } from "./actions";
export declare type Handler<TS> = (state: TS, payload: BackupRestorePayload) => void;
export declare type RestoreHandler<TS> = (state: TS, payload: BackupRestorePayload) => TS;
export interface Store<TS> {
    backup: Handler<TS>;
    restore: RestoreHandler<TS>;
    clear: Handler<TS>;
}
export declare const initStore: <TState>(reducerName: string, userStore?: Store<TState>) => Store<TState>;
