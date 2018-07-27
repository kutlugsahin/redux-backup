import { Store, ReduxBackupPayload } from "../types";

const DEFAULT_BACKUP_LABEL = 'DEFAULT_BACKUP_LABEL';

export default class MemoryStore<TState> implements Store<TState> {
	private store: any;
	constructor() {
		this.backup = this.backup.bind(this);
		this.restore = this.restore.bind(this);
		this.deleteBackup = this.deleteBackup.bind(this);
		this.store = {};
	}
	backup(state: TState, { label = DEFAULT_BACKUP_LABEL }: ReduxBackupPayload) {
		this.store[label] = JSON.stringify(state);
	}
	restore(state: TState, { label = DEFAULT_BACKUP_LABEL }: ReduxBackupPayload) {
		const stored = this.store[label];
		if (stored) {
			return JSON.parse(stored);
		} else {
			return state;
		}
	}
	deleteBackup(state: TState, { label }: ReduxBackupPayload) {
		if (label) {
			this.store[label] = undefined;
		} else {
			this.store = {};
		}
	}
}