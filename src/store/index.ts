import { createStore, Action, combineReducers } from 'redux';
import backup from 'redux-backup';

import userReducer, { USER_REDUCER_KEY } from './user';


export default createStore(combineReducers({
	user: backup(userReducer, USER_REDUCER_KEY),
}));