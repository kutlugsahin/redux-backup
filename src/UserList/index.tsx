import * as React from 'react';
import { connect } from "react-redux";
import { addUser, User, backupUserReducer, deleteUser } from '../store/users';
require('./styles.css');

interface UserListProps {
	users: User[];
	getUsers: any;
	deleteUser: any;
}

class UserList extends React.Component<UserListProps> {
	componentDidMount() {
		this.props.getUsers();
		this.renderUser = this.renderUser.bind(this);
		this.remove = this.remove.bind(this);
	}

	render() {
		const { users = [] } = this.props;
		return (
			<div className="user-list">
				<ul className="list-group">
					{users.map(this.renderUser)}
				</ul>
			</div>
		)
	}

	renderUser(user: User) {
		return (
			<li className="list-group-item" key={user.id}>
				<span>
					<span>{user.name} </span><button type="button" style={{ float: 'right' }} className="btn btn-outline-danger btn-sm" onClick={this.remove(user)}>X</button>
				</span>
			</li>
		)
	}
	remove(user) {
		return () => {
			this.props.deleteUser(user.id);
		}
	}
}

function mapsStateToProps(state) {
	return {
		users: state.users
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUsers: () => {
			fetch('https://jsonplaceholder.typicode.com/users')
				.then(response => response.json())
				.then(users => {
					dispatch(addUser(users));
					dispatch(backupUserReducer('Backup:Label 1'))
				})
		},
		deleteUser: p => dispatch(deleteUser(p))
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(UserList);