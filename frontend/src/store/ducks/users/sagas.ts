import { put,  takeLatest, call } from 'redux-saga/effects'
import {  setUsersLoadingStatus, setLastUsers } from './actionCreators'
// import { UsersApi } from '../../../services/api/tweetsApi'
import { UsersActionType, FetchLastUsersActionInterface } from './contracts/action'
import { SagaIterator } from 'redux-saga'
import { LoadingStatus } from '../../types'
import { UsersApi } from '../../../services/api/usersApi'
import { UserRead } from './contracts/state'

export function* watchFetchUsers() {
  yield takeLatest(UsersActionType.FETCH_LAST_USERS, fetchLastUsersWorker)
}

function* fetchLastUsersWorker({payload}: FetchLastUsersActionInterface): SagaIterator {
  try {
    yield put(setUsersLoadingStatus(LoadingStatus.LOADING))
    const data: UserRead[] = yield call(UsersApi.fetchLastUsers, payload)
    yield put(setLastUsers(data))
  } catch (error) {
    yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
  }
}