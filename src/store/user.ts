import { AnyAction } from "redux";
import { backupState, restoreState } from "redux-backup";

export const UPDATE_USER = 'UPDATE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const USER_REDUCER_KEY = 'USER_REDUCER';

export interface User {
	name: string;
	lastname: string;
}

export const updateUser = (user: User) => ({
	type: UPDATE_USER,
	payload: user
});

export const backupUserReducer = (label?: string) => {
	return backupState(USER_REDUCER_KEY, label);
}

export const restoreUserReducer = (label?: string) => {
	return restoreState(USER_REDUCER_KEY, label);
}

const defaultUser: User = {
	name: 'John', lastname: 'Doe'
}

export default (state: User = defaultUser, action: AnyAction) => {
	switch (action.type) {
		case UPDATE_USER:
			return { ...state, ...action.payload };
		case CLEAR_USER:
			return { };
		default:
			return state;
	}
}