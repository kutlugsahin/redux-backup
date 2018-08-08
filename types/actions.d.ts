import { ReduxBackupAction } from "./types";
export declare const restoreState: (reducerName: string, label?: string) => ReduxBackupAction;
export declare const backupState: (reducerName: string, label?: string) => ReduxBackupAction;
export declare const deleteBackup: (reducerName: string, label?: string) => ReduxBackupAction;
