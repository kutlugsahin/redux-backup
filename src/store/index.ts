import { createStore, Action, combineReducers } from 'redux';
import backup from 'redux-backup';

import userReducer from './users';


export default createStore(combineReducers({
	users: userReducer,
}), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());