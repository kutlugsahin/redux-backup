import { createStore, Action, combineReducers } from 'redux';

import userReducer from './users';
import backups from './backup';


export default createStore(combineReducers({
	users: userReducer,
	backups
}), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());