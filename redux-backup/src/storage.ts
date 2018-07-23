export type BackupHandler<TS> = (state: TS, label: string) => TS;
export type RestoreHandler<TS> = (state: TS, label: string) => TS;
export type ClearHandler<TS> = (state: TS) => TS;

export interface Store<TS> {
	backup: BackupHandler<TS>;
	restore: RestoreHandler<TS>;
	clear: ClearHandler<TS>;
}

export const initStore = <TState>(reducerName: string): Store<TState> => {
	const store: any = {};
	const backup: BackupHandler<TState> = (state: TState, label: string) => {
		return state;
	}

	const restore: RestoreHandler<TState> = (state: TState, label: string) => {
		return state;
	}

	const clear: ClearHandler<TState> = (state: TState) => {
		return state;
	}

	return {
		backup,
		restore,
		clear
	};
}