import { AnyAction, Action } from "redux";
import restorable, { backupState, restoreState } from "redux-backup";

export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'CLEAR_USER';

export const USER_REDUCER_KEY = 'USER_REDUCER';

export interface UserAddress {
	street?: string;
	suite?: string;
	city?: string;
	zipcode?: string;
}
export interface User {
	id: string;
	name?: string;
	username?: string;
	email?: string;
	address?: UserAddress;
}

export const updateUser = (user: User) => ({
	type: UPDATE_USER,
	payload: { id: user.id, user }
});

export const addUser = (user: User | User[]) => ({
	type: ADD_USER,
	payload: user
});

export const deleteUser = (id: string) => ({
	type: DELETE_USER,
	payload: id
});


export const backupUserReducer = (label?: string) => {
	return backupState(USER_REDUCER_KEY, label);
}

export const restoreUserReducer = (label?: string) => {
	return restoreState(USER_REDUCER_KEY, label);
}

export default restorable((state: User[] = [], action: AnyAction) => {
	switch (action.type) {
		case ADD_USER:
			const newusers = Array.isArray(action.payload) ? action.payload : [action.payload];
			return [...state, ...newusers];
		case DELETE_USER:
			return state.filter(p => p.id !== action.payload);
		case UPDATE_USER:
			const newState = [...state];
			const { id, user } = action.payload;
			const index = newState.findIndex(p => p.id === id);
			newState.splice(index, 1, { ...newState[index], ...user });
			return newState;
		default:
			return state;
	}
}, USER_REDUCER_KEY);