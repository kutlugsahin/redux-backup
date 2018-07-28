import { withBackup } from './reducer';
import { backupState, restoreState, deleteBackup } from './actions';
import { types, Store } from './types';

export {
	withBackup,
	backupState,
	restoreState,
	deleteBackup,
	types as actionTypes,
	Store
}