import * as React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { updateUser, User, restoreUserReducer, backupUserReducer } from './store/users';
import UserList from './UserList';
import Panel from './Panel';
import { Backup } from './store/backup';

interface AppProps {
  user?: User;
  updateUser?: (user: User) => any;
  restoreUserReducer?: any;
  backupUserReducer?: any;
  backups: Backup[];
}

interface AppState {
  
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.backup = this.backup.bind(this);
  }
  public render() {
    const { user } = this.props;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Redux-Backup</h1></div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <div className="user-list-box">
                <h3>Users</h3>                
                <UserList />
                <br />
                <div className="action-buttons">
                  <button className="btn btn-outline-primary btn-block" onClick={this.backup}>Backup Users</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="backup-box">
                <h3>Backups</h3>
                <Panel />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateUser(prop) {
    return (e) => {
      const newUser = {};
      newUser[prop] = e.target.value;
      this.props.updateUser(newUser as User);
    }
  }

  backup() {
    const { backups, backupUserReducer } = this.props;
    const lastBackup = backups[backups.length - 1];
    let nextVersion = 1;
    if (lastBackup) {
      nextVersion = (+lastBackup.label.split(':')[1]) + 1;
    }

    backupUserReducer(`Backup:${nextVersion}`);
  }
}

function mapDispatch(dispatch: Dispatch) {
  return bindActionCreators({
    updateUser,
    restoreUserReducer,
    backupUserReducer
  }, dispatch)
}

function mapsState(store) {
  return {
    user: store.user,
    backups: store.backups
  }
}

export default connect(mapsState, mapDispatch)(App);
