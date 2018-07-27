import { Action } from "redux";

export enum types {
	REDUX_RESTORE_BACKUP_ACTION_TYPE = '@@_REDUX_RESTORE/BACKUP',
	REDUX_RESTORE_RESTORE_ACTION_TYPE = '@@_REDUX_RESTORE/RESTORE',
	REDUX_RESTORE_DELETE_ACTION_TYPE = '@@_REDUX_RESTORE/DELETE',
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