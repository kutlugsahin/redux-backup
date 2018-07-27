import * as React from 'react';
import { connect } from "react-redux";
import { addUser, User, backupUserReducer } from '../store/users';

interface UserListProps {
	users: User[];
	getUsers: any;
}

class UserList extends React.Component<UserListProps> {
	componentDidMount() {
		this.props.getUsers();
	}
	
	render() {
		const { users = [] } = this.props;
		return (
			<div>
				{users.map((p, i) => <div key={p.id}>{p.name}</div>)}
			</div>
		)
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
					dispatch(backupUserReducer())
				})
		}
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(UserList);