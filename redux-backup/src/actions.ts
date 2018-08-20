import { ReduxBackupAction, types } from "./types";

const createActionCreater = (actionType: string) =>
	(reducerName: string, label?: string): ReduxBackupAction => ({
		type: actionType,
		payload: {
			reducerName,
			label
		}
	});

export const restoreState = createActionCreater(types.RESTORE);
export const backupState = createActionCreater(types.BACKUP);
export const deleteBackup = createActionCreater(types.BACKUP);