import * as React from 'react';
import { connect } from 'react-redux';
import BackupList from './BackupList';
import './styles.css';
import { Backup } from '../store/backup';
import { updateUser, User, restoreUserReducer, backupUserReducer } from '../store/users';
import { bindActionCreators, Dispatch } from 'redux';

interface PanelProps {
	backups: Backup[];
	backupUserReducer: any;
	restoreUserReducer: any;
}

class Panel extends React.Component<PanelProps> {
	constructor(props: PanelProps) {
		super(props);
		this.backup = this.backup.bind(this);
		this.restore = this.restore.bind(this);
	}

	render() {
		return (
			<div className="row">
				<div className="col">
					<div className="action-buttons">
						<button className="btn btn-primary wide" onClick={this.backup}>Backup</button>
					</div>
					<BackupList items={this.props.backups} onBackupClick={this.restore} /></div>
			</div>
		)
	}

	backup() {
		const { backups, backupUserReducer } = this.props;
		const lastBackup = backups[backups.length - 1];
		let nextVersion = 1;
		if (lastBackup) {
			nextVersion = (+lastBackup.label.split(' ')[1]) + 1;
		}

		backupUserReducer(`Backup:Label ${nextVersion}`);
	}

	restore(item: Backup) {
		this.props.restoreUserReducer(item.label);
	}
}

function mapStateToProps(state) {
	return {
		backups: state.backups
	}
}

function mapDispatch(dispatch: Dispatch) {
	return bindActionCreators({
		restoreUserReducer,
		backupUserReducer,
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatch)(Panel);

