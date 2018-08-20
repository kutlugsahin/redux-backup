import { Action, Reducer } from "redux";
export declare enum types {
    BACKUP = "@@_REDUX_BACKUP/BACKUP",
    RESTORE = "@@_REDUX_BACKUP/RESTORE",
    DELETE = "@@_REDUX_BACKUP/DELETE"
}
export interface ReduxBackupPayload {
    reducerName: string;
    label?: string;
}
export interface ReduxBackupAction extends Action {
    payload: ReduxBackupPayload;
}
export declare type Handler<TS> = (state: TS, payload: ReduxBackupPayload) => void;
export declare type RestoreHandler<TS> = (state: TS, payload: ReduxBackupPayload) => TS;
export interface Store<TS> {
    backup: Handler<TS>;
    restore: RestoreHandler<TS>;
    deleteBackup: Handler<TS>;
}
export declare type BackupReducer = <TS, TA extends Action>(reducer: Reducer<TS, TA>, reducerName: string, store?: Store<TS>) => Reducer<TS, TA>;
