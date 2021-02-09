import { all } from "redux-saga/effects"
import { watchFetchTweets } from "./ducks/tweets/sagas"
import { watchFetchTags } from "./ducks/tags/sagas"
import { watchFetchTweet } from "./ducks/tweet/sagas"
import { watchFetchUser } from "./ducks/user/sagas"
import { watchFetchUsers } from "./ducks/users/sagas"


export function* rootSaga() {
  yield all([
    watchFetchTweets(),
    watchFetchTags(),
    watchFetchTweet(),
    watchFetchUser(),
    watchFetchUsers()
  ])
}
