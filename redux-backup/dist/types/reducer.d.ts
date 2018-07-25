import { Action, Reducer } from "redux";
import { Store } from "./storage";
export interface BackupReducerOptions<TState> {
    store: Store<TState>;
}
declare function reducer<TS, TA extends Action>(reducer: Reducer<TS, TA>, reducerName: string, store?: Store<TS>): Reducer<TS, TA>;
export default reducer;
