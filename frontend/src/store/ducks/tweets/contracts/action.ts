import { Action } from "redux";
import { Tweet, AddFormState, TweetsState, ILike } from "./state";
import { LoadingStatus } from "../../../types";
import { ImagesType } from "../actionCreators";

export enum TweetsActionsType {
  SET_TWEETS = "tweets/SET_TWEETS",
  FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
  ADD_TWEET = "tweets/ADD_TWEET",
  FETCH_TWEETS = "tweets/FETCH_TWEETS",
  SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
  SET_ADD_FORM_STATE = "tweets/SET_ADD_FORM_STATE",
  REMOVE_TWEET = "tweets/REMOVE_TWEET",
  FETCH_REMOVE_TWEET = "tweets/FETCH_REMOVE_TWEET",
  SET_REMOVING_STATE = "tweets/SET_REMOVING_STATE",
  ADD_COMMENT_TO_TWEETS = "tweets/ADD_COMMENT_TO_TWEETS",
  REMOVE_COMMENT_FROM_TWEETS = "tweets/REMOVE_COMMENT_FROM_TWEETS",
}


export interface SetTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_TWEETS;
  payload: TweetsState["items"];
}

export interface FetchRemoveTweetActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_REMOVE_TWEET;
  payload: string;
}
export interface RemoveTweetActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.REMOVE_TWEET;
  payload: string;
}
export interface SetTweetsLoadingStatusActionInterface
  extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}

export interface FetchTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_TWEETS;
}
export interface FetchAddTweetActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_ADD_TWEET;
  payload: ImagesType;
}
export interface AddTweetActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.ADD_TWEET;
  payload: Tweet;
}

export interface SetAddFormStateActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_ADD_FORM_STATE;
  payload: AddFormState;
}
export interface SetRemovingStateActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_REMOVING_STATE;
  payload: LoadingStatus;
}
export interface AddCommentToTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.ADD_COMMENT_TO_TWEETS;
  payload: string;
}
export interface RemoveCommentFromTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.REMOVE_COMMENT_FROM_TWEETS;
  payload: string;
}