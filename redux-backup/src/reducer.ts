import { Action, Reducer } from "redux";
import { types, ReduxBackupAction, BackupRestorePayload } from "./actions";
import { initStore, Store, RestoreHandler } from "./storage";

const getPayload = (action: Action): BackupRestorePayload => {
	const backupAction = action as ReduxBackupAction;
	return backupAction.payload;
}

const mapActionTypeToStoreFunction = <TState, TAction extends Action>(store: Store<TState>) => {
	const map = {
		[types.REDUX_RESTORE_BACKUP_ACTION_TYPE]: store.backup,
		[types.REDUX_RESTORE_CLEAR_ACTION_TYPE]: store.clear,
		[types.REDUX_RESTORE_RESTORE_ACTION_TYPE]: store.restore,
	}

	return (action: TAction): RestoreHandler<TState> => map[action.type];
}

const handleReduxBackupAction = <TState, TAction extends Action>(_reducerName: string) => {
	const store = initStore<TState>(_reducerName);
	const getStoreFunctionByAction = mapActionTypeToStoreFunction(store);
	return (state: TState, action: TAction): TState | undefined => {
		const storeFunction = getStoreFunctionByAction(action);
		return storeFunction ? storeFunction(state, getPayload(action)) : undefined;
	}
}

export default <TS, TA extends Action>(reducer: Reducer<TS, TA>, reducerName: string): Reducer<TS, TA> => {
	const reduxBackupActionHandler = handleReduxBackupAction<TS, TA>(reducerName);
	return (state: TS, action: TA): TS => {
		const nextState = reduxBackupActionHandler(state, action);
		return nextState || reducer(state, action);
	}
}