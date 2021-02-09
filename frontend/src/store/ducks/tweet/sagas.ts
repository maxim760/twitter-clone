import { put, takeLatest, call } from 'redux-saga/effects'
import { TweetActionsType, setTweetLoadingStatus, setTweetData, FetchTweetActionInterface, FetchAddCommentActionInterface, addComment, FetchRemoveCommentActionInterface, FetchEditCommentActionInterface} from './actionCreators'
import { TweetsApi } from '../../../services/api/tweetsApi'
import { Tweet, ICommentItem, TweetFromServer, ILike } from '../tweets/contracts/state'
import { LoadingStatus } from '../../types'
import { CommentsApi } from '../../../services/api/commentsApi'
import { removeCommentFromTweets, addCommentToTweets } from '../tweets/actionCreators'
import { UserData } from '../user/contracts/state'

function* fetchTweetWorker({ payload: tweetId }: FetchTweetActionInterface) { // ага, следим за этим экшном, у него есть
  // пэйлоад, получаем его и тд // здесь типизруется интерфейс, так как мы в миддлваере знаем интрфейс, т.е. 
  // пэйлоад и тип экшна (здесь уже так сказаьть полная информация)
  try {
    const data: TweetFromServer = yield call(TweetsApi.fetchTweetData, tweetId)
    const tweetData: Tweet = {...data, comments: {comments: data.comments, count: data.comments.length}}
    yield put(setTweetData(tweetData))
  } catch (error) {
    yield put(setTweetLoadingStatus(LoadingStatus.ERROR))
  }
}

// type ICommentItemFromServer = {
//   _id: string;
//   user: UserData;
//   whoAnswer: UserData;
//   tweet: string;
//   text: string;
//   images?: string[];
//   createdAt: string;
//   likes: ILike;
// }
//TODO сдлеать лацки на комменты и потом ульби тв постгре ))))
function* fetchAddCommentWorker({ payload }: FetchAddCommentActionInterface) { // ага, следим за этим экшном, у него есть
  try {
    const data: ICommentItem = yield call(CommentsApi.fetchAddComment, payload)
    yield call(TweetsApi.fetchAddComment, {tweetId: payload.tweetId, commentId: data._id})
    console.log(data)
    yield put(addComment(data))
    yield put(addCommentToTweets(data.tweet))
  } catch (error) {
    yield put(setTweetLoadingStatus(LoadingStatus.ERROR))
  }
}
function* fetchUpdateCommentWorker({ payload }: FetchEditCommentActionInterface) { // ага, следим за этим экшном, у него есть
  try {
    const data: ICommentItem = yield call(CommentsApi.fetchUpdateComment, payload)
  } catch (error) {
    yield put(setTweetLoadingStatus(LoadingStatus.ERROR))
  }
}
function* fetchRemoveCommentWorker({ payload }: FetchRemoveCommentActionInterface) { // ага, следим за этим экшном, у него есть
  try {
    const data: ICommentItem = yield call(CommentsApi.fetchRemoveComment, payload)
    yield put(removeCommentFromTweets(data.tweet))
  } catch (error) {
    yield put(setTweetLoadingStatus(LoadingStatus.ERROR))
  }
}


export function* watchFetchTweet() {
  yield takeLatest(TweetActionsType.FETCH_TWEET_DATA, fetchTweetWorker)
  yield takeLatest(TweetActionsType.FETCH_ADD_COMMENT, fetchAddCommentWorker)
  yield takeLatest(TweetActionsType.FETCH_REMOVE_COMMENT, fetchRemoveCommentWorker)
  yield takeLatest(TweetActionsType.FETCH_EDIT_COMMENT, fetchUpdateCommentWorker)
  // вотчер ничего не делает, просто слежка, вызов
  // не приниммет параметров никаких // подключение слежки за компонентом
}
