import { withBackup } from 'redux-backup';

const userReducer = (state, action) => {
	switch (action.type) {
		case 'USER_ADD':
			// some code
			break;
		case 'USER_DELETE':
			// some code
			break;
		case 'USER_UPDATE':
			// some code
			break;
		default:
			return state;
	}
}

export default withBackup(userResucer, 'USER_REDUCER_NAME');


// ---------------------------------------------------------------
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { backupState, restoreState } from 'redux-backup';

function backup() {
	return backupState('USER_REDUCER_NAME');
}

function restore() {
	return restoreState('USER_REDUCER_NAME');
}

class UserList extends Component {
	render() {
		return (
			<div>
				{this.renderUsers()}
				<button onClick={() => this.props.backup()}>Backup</button>
				<button onClick={() => this.props.restore()}>Restore</button>
			</div>
		)
	}

	renderUsers() {
		// render code for user list
	}
}

function mapStateToProps(store) {
	return {
		users: store.users
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		backup,
		restore
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);