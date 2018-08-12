# redux-backup

Higher order Redux reducer to backup and restore reducer states. Inspired by [undo history recipe](https://redux.js.org/recipes/implementing-undo-history)

## Motivation

Most of the applications involves editing data that is retrieved by a rest API. Reverting changes to the original data set is a desired feature in most applications. The trivial approach is either copying the original data to somewhere in the application or re-fetching the data from server which is inefficient most of the time. Copying the data and restoring it to the reducer will require additional steps and parameters in reducers, action types and action creators which will be repeated for every reducer that you want to be revertable. This library aims to provide a solution for this in redux way.

### Demo
[https://kutlugsahin.github.io/redux-backup/](https://kutlugsahin.github.io/redux-backup/)

## Installation

`npm i redux-backup`

## Usage

#### reducer.js
```jsx
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

## withBackup
```js 
import { withBackup } from 'redux-restore';
```
The function to wrap the original reducer to enable backup and restore states.

```js
function withBackup(reducer, reducerName, store)
```
#### parameters
- **reducer**: `reducer` : A redux reducer.
- **reducerName**: `string` : The enhanced reducer with this name will later be targeted by the **backupState**, **restoreState** and **deleteBackup** action creators.
- **store**: `optional store object` : The object that you can provide for custom backup and restore logic. See [store sction](#store). When omited default store is applies which keeps backups in memory.
#### returns
- **reducer**: enhanced reducer

## backupState
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

## restoreState
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

## deleteBackup
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
The object that you can optionally provide to **withBackup** function to customize how states will be backup and restored. Store object must have three functions namely **backup** **restore** **deleteBackup** which will be called with respect to dispatched actions. Default store (a memory store) is used if no custom store is provided.
```js
const store = {
  backup,
  restore,
  deleteBackup
}
```
### backup
```js
function backup(state, payload){
  // backup logic...
}
```
#### parameters
- **state**: The state of the original reducer
- **payload**: redux-backup action payload
    - reducerName: string: name of the reducer
    - label: string: label for backup
#### returns
- **void**

### restore
```js
function restore(state, payload){
  // custom restore logic ...
  return newState;
}
```
#### parameters
- **state**: The state of the original reducer
- **payload**: redux-backup action payload
    - reducerName: string: name of the reducer
    - label: string: label for backup
#### returns
- **state**: restored state of the reducer

### deleteBackup
```js
function deleteBackup(state, payload){
  // delete backup logic...
}
```
#### parameters
- **state**: The state of the original reducer
- **payload**: redux-backup action payload
    - reducerName: string: name of the reducer
    - label: string: label for backup
#### returns
- **void**