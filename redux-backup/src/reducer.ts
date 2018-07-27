import { Action, Reducer } from "redux";
import { ReduxBackupPayload, ReduxBackupAction, types, Store, RestoreHandler } from "./types";
import { initStore } from "./storage";

const getPayload = (action: Action): ReduxBackupPayload => {
	const backupAction = action as ReduxBackupAction;
	return backupAction.payload;
}

const mapActionTypeToStoreFunction = <TState, TAction extends Action>(store: Store<TState>) => {
	const map = {
		[types.REDUX_RESTORE_BACKUP_ACTION_TYPE]: store.backup,
		[types.REDUX_RESTORE_DELETE_ACTION_TYPE]: store.deleteBackup,
		[types.REDUX_RESTORE_RESTORE_ACTION_TYPE]: store.restore,
	}

	return (action: TAction): RestoreHandler<TState> => map[action.type];
}


function handleReduxBackupAction<TState, TAction extends Action>(reducerName: string, _store?: Store<TState>) {
	const store = initStore<TState>(reducerName, _store);
	const getStoreFunctionByAction = mapActionTypeToStoreFunction(store);
	return (state: TState, action: TAction): TState | undefined => {
		const storeFunction = getStoreFunctionByAction(action);
		return storeFunction ? storeFunction(state, getPayload(action)) : undefined;
	}
}

function reducer<TS, TA extends Action>(reducer: Reducer<TS, TA>, reducerName: string, store?: Store<TS>): Reducer<TS, TA> {
	let reduxBackupActionHandler = handleReduxBackupAction<TS, TA>(reducerName, store);
	return (state: TS, action: TA): TS => {
		const nextState = reduxBackupActionHandler(state, action);
		return nextState || reducer(state, action);
	}
}

export default reducer;