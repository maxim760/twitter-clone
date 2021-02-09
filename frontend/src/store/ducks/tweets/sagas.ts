import { put, call, takeLeading, select } from "redux-saga/effects";
import {
  setTweetsLoadingStatus,
  setTweets,
  addTweet,
  setAddFormState,
  removeTweet,
  setRemovingState,
} from "./actionCreators";
import { TweetsApi } from "../../../services/api/tweetsApi";
import { AddFormState, Tweet, TweetFromServer } from "./contracts/state";
import {
  TweetsActionsType,
  FetchAddTweetActionInterface,
  FetchTweetsActionInterface,
  FetchRemoveTweetActionInterface,
} from "./contracts/action";
import { SagaIterator } from "redux-saga";
import { LoadingStatus } from "../../types";
import { selectTweetsPage } from "./selectors";

export function* watchFetchTweets() {
  yield takeLeading(TweetsActionsType.FETCH_ADD_TWEET, addTweetRequest);
  yield takeLeading(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLeading(TweetsActionsType.FETCH_REMOVE_TWEET, removeTweetRequest);
}

function* fetchTweetsRequest(): SagaIterator {
  try {
    const page = yield select(selectTweetsPage);
    const data: TweetFromServer[] = yield call(TweetsApi.fetchTweets, page);
    const tweets: Tweet[] = data.map((tweet) => {
      const newTweet: Tweet | TweetFromServer = { ...tweet };
      ((newTweet as unknown) as Tweet).comments = {
        comments: tweet.comments,
        count: tweet.comments.length,
      };
      return newTweet as unknown as Tweet
    });
    yield put(setTweets(tweets));
  } catch (error) {
    yield put(setTweetsLoadingStatus(LoadingStatus.ERROR));
  }
}
function* addTweetRequest({ payload }: FetchAddTweetActionInterface) {
  try {
    const item = yield call(TweetsApi.fetchAddTweet, payload);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setAddFormState(AddFormState.ERROR));
  }
}
function* removeTweetRequest({ payload }: FetchRemoveTweetActionInterface) {
  try {
    yield put(setRemovingState(LoadingStatus.LOADING));
    const status = yield call(TweetsApi.fetchRemoveTweet, payload);
    if (status === "success") {
      yield put(removeTweet(payload));
      yield put(setRemovingState(LoadingStatus.SUCCESS));
    } else {
      yield put(setRemovingState(LoadingStatus.ERROR));
    }
  } catch (error) {
    yield put(setRemovingState(LoadingStatus.ERROR));
  }
}
