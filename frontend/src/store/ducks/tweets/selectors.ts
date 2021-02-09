import { TweetsState } from "./contracts/state";
import { RootState } from "../../rootReducer";
import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
// createSelector создает мемоизированную версию селектора
export const selectTweets = (state: RootState): TweetsState => state.tweets;

export const selectTweetsLoadingStatus = (state: RootState) =>
  selectTweets(state).loadingState;
export const selectAddFormState = (state: RootState) =>
  selectTweets(state).addFormState;
export const selectRemovingState = (state: RootState) =>
  selectTweets(state).removingState;
export const selectRemovingStateEqualLoading = (state: RootState) =>
  selectTweets(state).removingState === LoadingStatus.LOADING;
export const selectTweetsPage = (state: RootState): number =>
  selectTweets(state).page;
export const selectTweetsLength = (state: RootState): number =>
  selectTweetsItems(state).length;

export const selectTweetsLoadingStatusIsLoaded = createSelector(
  selectTweets,
  (tweets: TweetsState): boolean => tweets.loadingState === LoadingStatus.LOADED
);

export const selectTweetsLoadingStatusIsLoading = createSelector(
  selectTweets,
  (tweets: TweetsState): boolean =>
    tweets.loadingState === LoadingStatus.LOADING
);

export const selectTweetsItems = createSelector(
  selectTweets,
  (tweets: TweetsState): TweetsState["items"] => tweets.items
);

export const selectTweetsForUser = (id: string) => (
  state: RootState
): TweetsState["items"] => {
  return selectTweetsItems(state).filter((tweet) => tweet.user._id === id);
};

export const selectTweetByIdFromTweets = (id: string) => (state: RootState) => {
  const tweets = selectTweetsItems(state);
  return tweets.find((item) => item._id === id);
};

export const selectTweetsDataCommentsLength = (id: string) => (
  state: RootState
) => selectTweetByIdFromTweets(id)(state)?.comments.count || 0;
