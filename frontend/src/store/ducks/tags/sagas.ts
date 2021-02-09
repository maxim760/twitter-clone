import { put, takeLatest, call } from 'redux-saga/effects'
import { TagsActionsType, setTagsLoadingStatus, setTags } from './actionCreators'
import { TagsApi } from '../../../services/api/tagsApi'
import { LoadingStatus } from '../../types'

export function* watchFetchTags() {
  yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest)
}

function* fetchTagsRequest() {
  try {
    const data = yield call(TagsApi.fetchTags)
    yield put(setTags(data))
  } catch (error) {
    yield put(setTagsLoadingStatus(LoadingStatus.ERROR))
  }
}