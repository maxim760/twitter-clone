import { TweetsState, Tweet, AddFormState, ILike } from "./contracts/state";
import {
  FetchAddTweetActionInterface,
  AddTweetActionInterface,
  SetTweetsActionInterface,
  SetTweetsLoadingStatusActionInterface,
  FetchTweetsActionInterface,
  SetAddFormStateActionInterface,
  TweetsActionsType,
  RemoveTweetActionInterface,
  FetchRemoveTweetActionInterface,
  SetRemovingStateActionInterface,
  AddCommentToTweetsActionInterface,
  RemoveCommentFromTweetsActionInterface,
} from "./contracts/action";
import { LoadingStatus } from "../../types";
import { AddCommentActionInterface } from "../tweet/actionCreators";

// структура : 1 енам который держит все типы, интерфейс каждой экшн и сам экшн каждый и 1 тип который все экшны содержит
// то что есть 1 енам очень классно, просто в него  все добавляем и всё!!!, не надо доп экспортов и тд

export const setTweets = (
  payload: TweetsState["items"]
): SetTweetsActionInterface => ({
  type: TweetsActionsType.SET_TWEETS,
  payload,
});

export type ImagesType = {text:string, images: string[]}
export const fetchAddTweet = (
  payload: ImagesType
): FetchAddTweetActionInterface => ({
  type: TweetsActionsType.FETCH_ADD_TWEET,
  payload,
});
export const addTweet = (payload: Tweet): AddTweetActionInterface => ({
  type: TweetsActionsType.ADD_TWEET,
  payload,
});
export const fetchRemoveTweet = (payload: string): FetchRemoveTweetActionInterface => ({
  type: TweetsActionsType.FETCH_REMOVE_TWEET,
  payload,
});
export const removeTweet = (payload: string): RemoveTweetActionInterface => ({
  type: TweetsActionsType.REMOVE_TWEET,
  payload,
});

export const setTweetsLoadingStatus = (
  payload: LoadingStatus
): SetTweetsLoadingStatusActionInterface => ({
  type: TweetsActionsType.SET_LOADING_STATE,
  payload,
});

export const fetchTweets = (): FetchTweetsActionInterface => ({
  type: TweetsActionsType.FETCH_TWEETS,
});
export const setAddFormState = (
  payload: AddFormState
): SetAddFormStateActionInterface => ({
  type: TweetsActionsType.SET_ADD_FORM_STATE,
  payload,
});
export const setRemovingState = (
  payload: LoadingStatus
): SetRemovingStateActionInterface => ({
  type: TweetsActionsType.SET_REMOVING_STATE,
  payload,
});
export const addCommentToTweets = (payload: string): AddCommentToTweetsActionInterface => ({
  type: TweetsActionsType.ADD_COMMENT_TO_TWEETS,
  payload
});
export const removeCommentFromTweets = (payload: string): RemoveCommentFromTweetsActionInterface => ({
  type: TweetsActionsType.REMOVE_COMMENT_FROM_TWEETS,
  payload
});

export type TweetsAction =
  | SetTweetsActionInterface
  | SetTweetsLoadingStatusActionInterface
  | FetchTweetsActionInterface
  | FetchAddTweetActionInterface
  | SetAddFormStateActionInterface
  | AddTweetActionInterface
  | RemoveTweetActionInterface
  | FetchRemoveTweetActionInterface
  | SetRemovingStateActionInterface
  | AddCommentToTweetsActionInterface
  | RemoveCommentFromTweetsActionInterface
