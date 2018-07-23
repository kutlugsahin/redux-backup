import { Action, Reducer } from "redux";
import { types, ReduxBackupAction, BackupRestorePayload } from "./actions";
import { initStore } from "./storage";

const DEFAULT_BACKUP_LABEL = 'DEFAULT_BACKUP_LABEL';

const getPayload = (action: Action): BackupRestorePayload => {
	const backupAction = action as ReduxBackupAction;
	return backupAction.payload;
}

const handleReduxBackupAction = <TState, TAction extends Action>(_reducerName: string) => {
	const store = initStore<TState>(_reducerName);

	return (state: TState, action: TAction): TState | undefined => {

		if (action.type === types.REDUX_RESTORE_BACKUP_ACTION_TYPE) {
			const { reducerName, label = DEFAULT_BACKUP_LABEL } = getPayload(action);
			return reducerName === _reducerName ? store.backup(state, label) : state;
		} else if (action.type === types.REDUX_RESTORE_RESTORE_ACTION_TYPE) {
			const { reducerName, label = DEFAULT_BACKUP_LABEL } = getPayload(action);
			return reducerName === _reducerName ? store.restore(state, label) : state;
		} else if (action.type === types.REDUX_RESTORE_CLEAR_ACTION_TYPE) {
			const { reducerName } = getPayload(action);
			return reducerName === _reducerName ? store.clear(state) : state;
		}


		return undefined;
	}
}

export default <TS, TA extends Action>(reducer: Reducer<TS, TA>, reducerName: string): Reducer<TS, TA> => {
	const reduxBackupActionHandler = handleReduxBackupAction<TS, TA>(reducerName);
	return (state: TS, action: TA): TS => {
		const nextState = reduxBackupActionHandler(state, action);
		return nextState || reducer(state, action);
	}
}