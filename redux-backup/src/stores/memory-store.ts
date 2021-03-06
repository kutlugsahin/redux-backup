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
		this.store[label] = state;
	}
	restore(state: TState, { label = DEFAULT_BACKUP_LABEL }: ReduxBackupPayload) {
		return this.store[label] || state;
	}
	deleteBackup(state: TState, { label }: ReduxBackupPayload) {
		if (label) {
			this.store[label] = undefined;
		} else {
			this.store = {};
		}
	}
}