# redux-backup

Higher order reducer to backup and restore reducers inspired by [undo history recipe](https://redux.js.org/recipes/implementing-undo-history)

## Motivation

Most of the applications involves editing data that is retrieved by a rest API. Reverting changes to the original data set will usually be provided in the application. The trivial approach is either copying the original data to somewhere in the appliction or re-fetching the data from server which is redunant most of the time. Copying the data and restoring it to the reducer will require additional steps and parameters in reducers, action types and action creators wich will be repeated for every reducer that you want to be revertable. This library aims to provide a solution for this in redux way.

## Installation

`npm i redux-backup`

## Usage

#### reducer.js
```jsx
import { withBackup } from 'redux-backup';

const userReducer = (state, action){
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
```

#### SimpleComponent.jsx
```jsx
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
        <button>Restore</button>
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
```

# API

### withBackup
```js 
import { withBackup } from 'redux-restore';
```
The function to wrap the original reducer to enable backup and restore states.

```js
function withBackup(reducer, reducerName, store)
```
#### parameters
- **reducer**: `reducer` : A redux reducer.
- **reducerName**: `string` : This name will later be targeted by the **backupState** and **restoreState** action creators.
- **store**: `optional store object` : The object that you can provide custom backup and restore logic with. See [store sction](#store)
#### returns
- **reducer**: enhanced reducer

### backupState
The action creater to backup the reducer targeted with reducerName.
```js 
import { backupState } from 'redux-restore';
```
```js 
function backupState(reducerName, label)
```
#### parameters
- **reducerName**: `string` : The name of the reducer that you want to backup.
- **label**: `optional string` : The label for the backup of the state allowing the make multiple backups. This label will later be used to restore a specific backup. If no label is provided state will be stored with a defaul label and will be overwritten by each backup.
#### returns
- **action**: A redux action to be dispatched.

### restoreState
The action creater to backup the reducer targeted with reducerName.
```js 
import { restoreState } from 'redux-restore';
```
```js 
function restoreState(reducerName, label)
```
#### parameters
- **reducerName**: `string` : The name of the reducer that you want to restore.
- **label**: `optional string` : The label of a specific backup given to **backupState** action creator. If no label is provided backup with the defaul label will be restored if possible.
#### returns
- **action**: A redux action to be dispatched.

### deleteBackup
The action creater to backup the reducer targeted with reducerName.
```js 
import { deleteBackup } from 'redux-restore';
```
```js 
function deleteBackup(reducerName, label)
```
#### parameters
- **reducerName**: `string` : The name of the reducer that you want to delete backup of.
- **label**: `optional string` : The label of a specific backup to be deleted. If no label is provided all backups of the reducer state will be deleted.
#### returns
- **action**: A redux action to be dispatched.


## Store
