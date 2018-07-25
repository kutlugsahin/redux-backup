import { BackupRestorePayload } from "./actions";

const DEFAULT_BACKUP_LABEL = 'DEFAULT_BACKUP_LABEL';

export type Handler<TS> = (state: TS, payload: BackupRestorePayload) => void;
export type RestoreHandler<TS> = (state: TS, payload: BackupRestorePayload) => TS;

export interface Store<TS> {
	backup: Handler<TS>;
	restore: RestoreHandler<TS>;
	clear: Handler<TS>;
}

const filterReducer = (reducerName: string) => <TS>(handler: Handler<TS>): Handler<TS> => {
	return (state: TS, payload: BackupRestorePayload) => {
		let handlerResult = null;
		if (reducerName === payload.reducerName) {
			handlerResult = handler(state, payload);
		}
		return handlerResult || state;
	}
}

const filterStore = <TS>(reducerName: string, { restore, backup, clear }: Store<TS>): Store<TS> => {
	const filter = filterReducer(reducerName);
	return {
		backup: filter(backup),
		restore: filter(restore) as RestoreHandler<TS>,
		clear: filter(clear)
	};
}

const defaultStore = <TState>(): Store<TState> => {
	let store: any = {};
	return {
		backup: (state: TState, { label = DEFAULT_BACKUP_LABEL }: BackupRestorePayload) => {
			store[label] = JSON.stringify(state);
		},
		restore: (state: TState, { label = DEFAULT_BACKUP_LABEL }: BackupRestorePayload) => {
			const stored = store[label];
			if (stored) {
				return JSON.parse(stored);
			} else {
				return state;
			}
		},
		clear: (state: TState) => {
			store = {};
		}
	}
}

export const initStore = <TState>(reducerName: string, store: Store<TState> = defaultStore()): Store<TState> => {
	return filterStore(reducerName, store);
}