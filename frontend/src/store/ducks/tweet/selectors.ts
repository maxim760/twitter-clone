import { TweetState } from "./contracts/state";
import { RootState } from "../../rootReducer";
import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
// createSelector создает мемоизированную версию селектора
export const selectTweet = (state: RootState): TweetState => state.tweet;

export const selectTweetDataLoadingStatus = (state: RootState) => selectTweet(state).loadingState
export const selectTweetCommentModal = (state: RootState) => selectTweet(state).commentModal
export const selectTweetActiveReplyFull = (state: RootState) => selectTweet(state).activeReply
export const selectTweetActiveReply = (state: RootState) => {
  const reply = selectTweetActiveReplyFull(state)
  if (!reply) {
    return null
  }

  const { createdAt, whoAnswer, user, text, images, tweetId} = reply

  return {
    createdAt,
    whoAnswer: {_id: whoAnswer._id, username: whoAnswer.username},
    user: { username: user.username, avatar: user.avatar, fullname: user.fullname },
    text,
    images,
    tweetId

  }
}

  export const selectTweetData = createSelector(
  selectTweet,
  (tweet: TweetState): TweetState["data"] => tweet.data
);


export const selectTweetDataLoadingStatusIsLoaded = createSelector(
  selectTweet,
  (tweet: TweetState): boolean => tweet.loadingState === LoadingStatus.LOADED
);

export const selectTweetDataLoadingStatusIsLoading = createSelector(
  selectTweet,
  (tweet: TweetState): boolean => tweet.loadingState === LoadingStatus.LOADING
);

export const selectTweetDataComments = (state: RootState) => selectTweetData(state)?.comments
export const selectTweetDataCommentsItems = (state: RootState) => selectTweetDataComments(state)?.comments || []
export const selectActiveTweetCommentsLength = (state: RootState) => selectTweetDataComments(state)?.count || 0
