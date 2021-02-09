import { LoadingStatus } from "../../../types";
import { UserState, UserData } from "../../user/contracts/state";

export enum AddFormState {
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface ICommentItem {
  _id: string;
  user: UserData;
  whoAnswer: UserData;
  tweet: string;
  text: string;
  images?: string[];
  createdAt: string;
  likes: ILike;
}
export interface IComment {
  comments: ICommentItem[];
  count: number;
}

export interface ILike {
  count: number;
  from: string[];
}

export interface Tweet {
  _id: string;
  images?: string[];
  createdAt: string;
  likes: ILike;
  comments: IComment;
  user: UserData;
  text: string;
}
export interface TweetFromServer {
  _id: string;
  images?: string[];
  createdAt: string;
  likes: ILike;
  comments: ICommentItem[];
  user: UserData;
  text: string;
}

export interface TweetsState {
  page: number;
  items: Tweet[];
  loadingState: LoadingStatus;
  addFormState: AddFormState;
  removingState: LoadingStatus;
}
