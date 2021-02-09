import { TweetState, IActiveReply } from "./contracts/state";
import { Action } from "redux";
import { LoadingStatus } from "../../types";
import { ICommentItem, Tweet } from "../tweets/contracts/state";
import { ICommentToUpdate } from "../../../services/api/commentsApi";

// структура : 1 енам который держит все типы, интерфейс каждой экшн и сам экшн каждый и 1 тип который все экшны содержит
// то что есть 1 енам очень классно, просто в него  все добавляем и всё!!!, не надо доп экспортов и тд
export enum TweetActionsType {
  SET_TWEET_DATA = "tweet/SET_TWEET_DATA",
  FETCH_TWEET_DATA = "tweet/FETCH_TWEET_DATA",
  SET_LOADING_STATE = "tweet/SET_LOADING_STATE",
  CLEAR_TWEET_DATA = "tweet/CLEAR_TWEET_DATA",
  OPEN_COMMENT_MODAL = "tweet/OPEN_COMMENT_MODAL",
  CLOSE_COMMENT_MODAL = "tweet/CLOSE_COMMENT_MODAL",
  SET_ACTIVE_REPLY = "tweet/SET_ACTIVE_REPLY",
  ADD_COMMENT = "tweet/ADD_COMMENT",
  FETCH_ADD_COMMENT = "tweet/FETCH_ADD_COMMENT",
  FETCH_EDIT_COMMENT = "tweet/FETCH_EDIT_COMMENT",
  FETCH_REMOVE_COMMENT = "tweet/FETCH_REMOVE_COMMENT",
}

export type ICommentToFetch = {
  images?: string[];
  text: string;
  whoAnswer: string;
  tweetId: string;
};

export interface SetTweetTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_TWEET_DATA;
  payload: TweetState["data"];
}
export interface SetActiveReplyActionInterface
  extends Action<TweetActionsType> {
  type: TweetActionsType.SET_ACTIVE_REPLY;
  payload: IActiveReply;
}
export interface AddCommentActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.ADD_COMMENT;
  payload: ICommentItem;
}
export interface FetchAddCommentActionInterface
  extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_ADD_COMMENT;
  payload: ICommentToFetch;
}


export interface FetchEditCommentActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_EDIT_COMMENT,
  payload: ICommentToUpdate,
};
export interface FetchRemoveCommentActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_REMOVE_COMMENT,
  payload: string,
};


export interface SetTweetLoadingStatusActionInterface
  extends Action<TweetActionsType> {
  type: TweetActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}

export interface FetchTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_TWEET_DATA;
  payload: string;
}
export interface ClearTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.CLEAR_TWEET_DATA;
}
export interface OpenCommentModalActionInterface
  extends Action<TweetActionsType> {
  type: TweetActionsType.OPEN_COMMENT_MODAL;
}
export interface CloseCommentModalActionInterface
  extends Action<TweetActionsType> {
  type: TweetActionsType.CLOSE_COMMENT_MODAL;
}

export const setTweetData = (
  payload: TweetState["data"]
): SetTweetTweetActionInterface => ({
  type: TweetActionsType.SET_TWEET_DATA,
  payload,
});
export const setActiveReply = (
  payload: IActiveReply
): SetActiveReplyActionInterface => ({
  type: TweetActionsType.SET_ACTIVE_REPLY,
  payload,
});
export const addComment = (
  payload: ICommentItem
): AddCommentActionInterface => ({
  type: TweetActionsType.ADD_COMMENT,
  payload,
});
export const fetchAddComment = (
  payload: ICommentToFetch
): FetchAddCommentActionInterface => ({
  type: TweetActionsType.FETCH_ADD_COMMENT,
  payload,
});
export const fetchEditComment = (
  payload: ICommentToUpdate
): FetchEditCommentActionInterface => ({
  type: TweetActionsType.FETCH_EDIT_COMMENT,
  payload,
});
export const fetchRemoveComment = (
  payload: string
): FetchRemoveCommentActionInterface => ({
  type: TweetActionsType.FETCH_REMOVE_COMMENT,
  payload,
});

export const setTweetLoadingStatus = (
  payload: LoadingStatus
): SetTweetLoadingStatusActionInterface => ({
  type: TweetActionsType.SET_LOADING_STATE,
  payload,
});

export const fetchTweetData = (payload: string): FetchTweetActionInterface => ({
  type: TweetActionsType.FETCH_TWEET_DATA,
  payload,
});

export const clearTweetData = (): ClearTweetActionInterface => ({
  type: TweetActionsType.CLEAR_TWEET_DATA,
});
export const openCommentModal = (): OpenCommentModalActionInterface => ({
  type: TweetActionsType.OPEN_COMMENT_MODAL,
});
export const closeCommentModal = (): CloseCommentModalActionInterface => ({
  type: TweetActionsType.CLOSE_COMMENT_MODAL,
});

export type TweetAction =
  | SetTweetTweetActionInterface
  | SetTweetLoadingStatusActionInterface
  | FetchTweetActionInterface
  | ClearTweetActionInterface
  | OpenCommentModalActionInterface
  | CloseCommentModalActionInterface
  | SetActiveReplyActionInterface
  // | FetchAddCommentActionInterface
  | AddCommentActionInterface
  | FetchEditCommentActionInterface
  | FetchRemoveCommentActionInterface
