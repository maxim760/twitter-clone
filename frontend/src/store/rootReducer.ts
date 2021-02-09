import { combineReducers } from "redux";
import { tweetsReducer } from "./ducks/tweets/reducer";
import { TweetsState } from "./ducks/tweets/contracts/state";
import { tagsReducer } from "./ducks/tags/reducer";
import { TagsState } from "./ducks/tags/contracts/state";
import { TweetState } from "./ducks/tweet/contracts/state";
import { tweetReducer } from "./ducks/tweet/reducer";
import { UserState } from "./ducks/user/contracts/state";
import { userReducer } from "./ducks/user/reducer";
import { usersReducer } from "./ducks/users/reducer";
import { UsersState } from "./ducks/users/contracts/state";
import { ModalState } from "./ducks/modal/contracts/state";
import { modalReducer } from "./ducks/modal/reducer";
import { editReducer } from "./ducks/edit/reducer";
import { EditState } from "./ducks/edit/contracts/state";

export type AllState =
  | TweetsState
  | TagsState
  | TweetState
  | UserState
  | UsersState
  | ModalState

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  tags: tagsReducer,
  modal: modalReducer,
  tweet: tweetReducer,
  user: userReducer,
  users: usersReducer,
  edit: editReducer,
});

export interface RootState {
  tweets: TweetsState;
  tags: TagsState;
  modal: ModalState;
  tweet: TweetState;
  user: UserState;
  users: UsersState;
  edit: EditState;
}
