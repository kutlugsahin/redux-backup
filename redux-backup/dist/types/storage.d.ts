import { BackupRestorePayload } from "./actions";
export declare type Handler<TS> = (state: TS, payload: BackupRestorePayload) => TS;
export interface Store<TS> {
    backup: Handler<TS>;
    restore: Handler<TS>;
    clear: Handler<TS>;
}
export declare const initStore: <TState>(reducer: string) => Store<TState>;
