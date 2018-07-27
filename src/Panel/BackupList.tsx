import * as React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { Backup } from '../store/backup';

interface BackupListProps {
	items: Backup[];
	onBackupClick: (backup: Backup) => void;
}

class BackupList extends React.Component<BackupListProps> {
	constructor(props: BackupListProps) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
	}

	render() {
		return (
			<div className="row backup-list">
				<div className="col">
					<ul className="list-group">
						{this.props.items.map(this.renderItem)}
					</ul>
				</div>
			</div>
		)
	}

	renderItem(item: Backup, index: number) {
		return (
			<li className="list-group-item backup-item" key={index} onClick={_ => this.props.onBackupClick(item)}>
				<div>{item.label} Backup Time:{item.date.toLocaleTimeString()} <button type="button" style={{ float: 'right' }} className="btn btn-outline-success btn-sm">restore</button></div>
			</li>
		)
	}
}

export default BackupList;