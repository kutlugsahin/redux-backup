import { MemoryStore } from "./stores";
import { Handler, ReduxBackupPayload, Store, RestoreHandler } from "./types";

const filterReducer = (reducerName: string) => <TS>(handler: Handler<TS>): Handler<TS> => {
	return (state: TS, payload: ReduxBackupPayload) => {
		let handlerResult = null;
		if (reducerName === payload.reducerName) {
			handlerResult = handler(state, payload);
		}
		return handlerResult || state;
	}
}

const filterStore = <TS>(reducerName: string, store: Store<TS>): Store<TS> => {
	const filter = filterReducer(reducerName);
	return {
		backup: filter(store.backup),
		restore: filter(store.restore) as RestoreHandler<TS>,
		deleteBackup: filter(store.deleteBackup)
	};
}

export const initStore = <TState>(reducerName: string, store: Store<TState> = new MemoryStore()): Store<TState> => {
	return filterStore(reducerName, store);
}