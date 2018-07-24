import { BackupRestorePayload } from "./actions";

const DEFAULT_BACKUP_LABEL = 'DEFAULT_BACKUP_LABEL';

export type Handler<TS> = (state: TS, payload: BackupRestorePayload) => void;
export type RestoreHandler<TS> = (state: TS, payload: BackupRestorePayload) => TS;

export interface Store<TS> {
	backup: Handler<TS>;
	restore: Handler<TS>;
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

export const initStore = <TState>(reducerName: string): Store<TState> => {
	const filter = filterReducer(reducerName);
	let store: any = {};
	const backup: Handler<TState> = (state: TState, { label = DEFAULT_BACKUP_LABEL}: BackupRestorePayload) => {
		store[label] = JSON.stringify(state);
	}

	const restore: RestoreHandler<TState> = (state: TState, { label = DEFAULT_BACKUP_LABEL }: BackupRestorePayload) => {
		const stored = store[label];

		if (stored) {
			return JSON.parse(stored);
		} else {
			return state;
		}
	}

	const clear: Handler<TState> = (state: TState) => {
		store = {};
	}

	return {
		backup: filter(backup),
		restore: filter(restore),
		clear: filter(clear)
	};
}