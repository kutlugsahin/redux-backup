export declare type BackupHandler<TS> = (state: TS, label: string) => TS;
export declare type RestoreHandler<TS> = (state: TS, label: string) => TS;
export declare type ClearHandler<TS> = (state: TS) => TS;
export interface Store<TS> {
    backup: BackupHandler<TS>;
    restore: RestoreHandler<TS>;
    clear: ClearHandler<TS>;
}
export declare const initStore: <TState>(reducerName: string) => Store<TState>;
