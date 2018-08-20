import { Action, Reducer } from "redux";

export enum types {
	REDUX_RESTORE_BACKUP_ACTION_TYPE = '@@_REDUX_BACKUP/BACKUP',
	REDUX_RESTORE_RESTORE_ACTION_TYPE = '@@_REDUX_BACKUP/RESTORE',
	REDUX_RESTORE_DELETE_ACTION_TYPE = '@@_REDUX_BACKUP/DELETE',
}

export interface ReduxBackupPayload {
	reducerName: string;
	label?: string;
}

export interface ReduxBackupAction extends Action {
	payload: ReduxBackupPayload;
}

export type Handler<TS> = (state: TS, payload: ReduxBackupPayload) => void;
export type RestoreHandler<TS> = (state: TS, payload: ReduxBackupPayload) => TS;

export interface Store<TS> {
	backup: Handler<TS>;
	restore: RestoreHandler<TS>;
	deleteBackup: Handler<TS>;
}

export type BackupReducer = <TS, TA extends Action>(reducer: Reducer<TS, TA>, reducerName: string, store?: Store<TS>) => Reducer<TS, TA>;