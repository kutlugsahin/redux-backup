import Reducer from './reducer';
import { backupState, restoreState, deleteBackup } from './actions';
import { types, Store } from './types';

export default Reducer;

export {
	backupState,
	restoreState,
	deleteBackup,
	types as actionTypes,
	Store
}