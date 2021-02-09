import { Action } from "redux";
import { UsersState } from "./state";
import { LoadingStatus } from "../../../types";

export enum UsersActionType {
  SET_USERS = "users/SET_USERS",
  FETCH_USERS = "users/FETCH_USERS",
  SET_LAST_USERS = "users/SET_LAST_USERS",
  FETCH_LAST_USERS = "users/FETCH_LAST_USERS",
  SET_LOADING_STATE = "users/SET_LOADING_STATE",
}


export interface SetUsersActionInterface extends Action<UsersActionType> {
  type: UsersActionType.SET_USERS;
  payload: UsersState["users"];
}
export interface FetchUsersActionInterface extends Action<UsersActionType> {
  type: UsersActionType.FETCH_USERS;
}

export interface SetLastUsersActionInterface extends Action<UsersActionType> {
  type: UsersActionType.SET_LAST_USERS;
  payload: UsersState["lastUsers"];
}
export interface FetchLastUsersActionInterface extends Action<UsersActionType> {
  type: UsersActionType.FETCH_LAST_USERS;
  payload: number
}

export interface SetUsersLoadingStatusActionInterface
  extends Action<UsersActionType> {
  type: UsersActionType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
