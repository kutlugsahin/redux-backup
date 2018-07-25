import * as React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { updateUser, User, restoreUserReducer, backupUserReducer } from './store/user';

interface AppProps {
  user?: User;
  updateUser?: (user: User) => any;
  restoreUserReducer?: any;
  backupUserReducer?: any;
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }
  public render() {
    const { user } = this.props;
    return (
      <div className="App">
        <h1>Redux-Backup</h1>
        <div>
          <div className="formline">
            <label htmlFor="">name</label>
            <input type="text" value={user.name} onChange={this.updateUser('name')}/>
          </div>
          <div className="formline">
            <label htmlFor="">lastname</label>
            <input type="text" value={user.lastname} onChange={this.updateUser('lastname')} />            
          </div>
          <div>
            <button onClick={() => this.props.restoreUserReducer()}>revert</button>
          </div>
          <div>
            <button onClick={() => this.props.backupUserReducer()}>backup</button>
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
    user: store.user
  }
}

export default connect(mapsState, mapDispatch)(App);
