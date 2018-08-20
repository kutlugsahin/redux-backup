import { Action, AnyAction } from "redux";
import { actionTypes } from "redux-backup";

export interface Backup {
	label: string;
	date: Date;
}

export default (state: Backup[] = [], action: AnyAction) => {
	switch (action.type) {
		case actionTypes.BACKUP:
			return [...state, {
				label: action.payload.label,
				date: new Date()
			}];
		case actionTypes.DELETE:
			return state.filter(p => p.label !== action.payload.label);
		default:
			return state;
	}
}