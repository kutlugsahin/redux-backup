import * as React from 'react';
import { connect } from "react-redux";
import { addUser, User, backupUserReducer, deleteUser } from '../store/users';
require('./styles.css');

interface UserListProps {
	users: User[];
	getUsers: any;
	deleteUser: any;
	addUser: any;
}

interface UserListState {
	username: string;
}

class UserList extends React.Component<UserListProps, UserListState> {

	constructor(props: UserListProps) {
		super(props);
		this.renderUser = this.renderUser.bind(this);
		this.remove = this.remove.bind(this);
		this.addNewUser = this.addNewUser.bind(this);
		this.state = {
			username: ''
		}
	}
	componentDidMount() {
		this.props.getUsers();		
	}

	render() {
		const { users = [] } = this.props;
		return (
			<div className="user-list">
				<div className="input-group mb-3">
					<input type="text" className="form-control" onKeyDown={e => e.keyCode === 13 && this.addNewUser()} placeholder="New user" aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
					<div className="input-group-append">
						<button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.addNewUser}>Add</button>
					</div>
				</div>
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

	addNewUser() {
		if (this.state.username) {
			this.props.addUser({
				id: Math.random() + '',
				name: this.state.username,
			});

			this.setState({
				username: ''
			});
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
					dispatch(backupUserReducer('Backup:1'))
				})
		},
		deleteUser: p => dispatch(deleteUser(p)),
		addUser: p => dispatch(addUser(p))
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(UserList);