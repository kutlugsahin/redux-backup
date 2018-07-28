import { Action, Reducer } from "redux";
import { Store } from "./types";
declare function reducer<TS, TA extends Action>(reducer: Reducer<TS, TA>, reducerName: string, store?: Store<TS>): Reducer<TS, TA>;
export declare const withBackup: typeof reducer;
export {};
