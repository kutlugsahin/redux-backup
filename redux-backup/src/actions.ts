import { ReduxBackupAction, types } from "./types";

const createActionCreater = (actionType: string) =>
	(reducerName: string, label?: string): ReduxBackupAction => ({
		type: actionType,
		payload: {
			reducerName,
			label
		}
	});

export const restoreState = createActionCreater(types.REDUX_RESTORE_RESTORE_ACTION_TYPE);
export const backupState = createActionCreater(types.REDUX_RESTORE_BACKUP_ACTION_TYPE);
export const deleteBackup = createActionCreater(types.REDUX_RESTORE_BACKUP_ACTION_TYPE);