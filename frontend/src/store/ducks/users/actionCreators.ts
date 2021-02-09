import { UsersState } from "./contracts/state";
import {
  SetUsersActionInterface,
  SetUsersLoadingStatusActionInterface,
  UsersActionType,
  FetchUsersActionInterface,
  FetchLastUsersActionInterface,
  SetLastUsersActionInterface,
} from "./contracts/action";
import { LoadingStatus } from "../../types";

// структура : 1 енам который держит все типы, интерфейс каждой экшн и сам экшн каждый и 1 тип который все экшны содержит
// то что есть 1 енам очень классно, просто в него  все добавляем и всё!!!, не надо доп экспортов и тд

export const setUsers = (
  payload: UsersState["users"]
): SetUsersActionInterface => ({
  type: UsersActionType.SET_USERS,
  payload,
});
export const fetchUsers = (): FetchUsersActionInterface => ({
  type: UsersActionType.FETCH_USERS,
});
export const setLastUsers = (
  payload: UsersState["lastUsers"]
): SetLastUsersActionInterface => ({
  type: UsersActionType.SET_LAST_USERS,
  payload,
});
export const fetchLastUsers = (
  payload: number
): FetchLastUsersActionInterface => ({
  type: UsersActionType.FETCH_LAST_USERS,
  payload,
});

export const setUsersLoadingStatus = (
  payload: LoadingStatus
): SetUsersLoadingStatusActionInterface => ({
  type: UsersActionType.SET_LOADING_STATE,
  payload,
});

export type UsersAction =
  | SetUsersLoadingStatusActionInterface
  | SetUsersActionInterface
  | FetchUsersActionInterface
  | FetchLastUsersActionInterface
  | SetLastUsersActionInterface;
