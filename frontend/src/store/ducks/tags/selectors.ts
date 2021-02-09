import { TagsState } from "./contracts/state";
import { RootState } from "../../rootReducer";
import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
// createSelector создает мемоизированную версию селектора
export const selectTags = (state: RootState): TagsState => state.tags;

export const selectTagsLoadingStatus = (state: RootState) => selectTags(state).loadingState

export const selectTagsLoadingStatusIsLoaded = createSelector(
  selectTags,
  (tags: TagsState): boolean => tags.loadingState === LoadingStatus.LOADED
);

export const selectTagsLoadingStatusIsLoading = createSelector(
  selectTags,
  (tags: TagsState): boolean => tags.loadingState === LoadingStatus.LOADING
);

export const selectTagsItems = createSelector(
  selectTags,
  (tags: TagsState): TagsState["items"] => tags.items
);
