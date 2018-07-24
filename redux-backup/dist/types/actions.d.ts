import { Action } from "redux";
export declare enum types {
    REDUX_RESTORE_BACKUP_ACTION_TYPE = "@@_REDUX_RESTORE/BACKUP",
    REDUX_RESTORE_RESTORE_ACTION_TYPE = "@@_REDUX_RESTORE/RESTORE",
    REDUX_RESTORE_CLEAR_ACTION_TYPE = "@@_REDUX_RESTORE/CLEAR"
}
export interface ReduxBackupPayload {
    reducerName: string;
}
export interface BackupRestorePayload extends ReduxBackupPayload {
    label?: string;
}
export interface ReduxBackupAction extends Action {
    payload: ReduxBackupPayload;
}
export interface RestoreAction extends ReduxBackupAction {
    payload: BackupRestorePayload;
}
export interface BackupAction extends ReduxBackupAction {
    payload: BackupRestorePayload;
}
export interface ClearBackupAction extends ReduxBackupAction {
    payload: ReduxBackupPayload;
}
export declare const restoreState: (reducerName: string, label?: string) => RestoreAction;
export declare const backupState: (reducerName: string, label?: string) => RestoreAction;
export declare const clearBackups: (reducerName: string) => ClearBackupAction;
