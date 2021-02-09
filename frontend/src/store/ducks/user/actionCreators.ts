import { UserState, ErrorUser } from "./contracts/state";
import {
  SetUserDataActionInterface,
  SetUserLoadingStatusActionInterface,
  UserActionsType,
  FetchSignInActionInterface,
  FetchSignUpActionInterface,
  SetUserLoadingRegisterStatusActionInterface,
  FetchUserDataActionInterface,
  SignOutActionInterface,
  SetUserPageActionInterface,
  AddAvatarActionInterface,
  AddBackgroundActionInterface,
  AddPropToUserByPropNameActionInterface,
  SetUserLoadingLoginStatusActionInterface,
  SetSearchActionInterface,
} from "./contracts/action";
import { LoadingStatus } from "../../types";
import {
  LoginFormProps,
  RegisterFormProps,
} from "../../../pages/Signin/components/types";
import { IEditInfo } from "../edit/contracts/state";
import { ImageObj } from "../../../components/AddTweetForm";

// структура : 1 енам который держит все типы, интерфейс каждой экшн и сам экшн каждый и 1 тип который все экшны содержит
// то что есть 1 енам очень классно, просто в него  все добавляем и всё!!!, не надо доп экспортов и тд

export const setUserData = (
  payload: UserState["data"]
): SetUserDataActionInterface => ({
  type: UserActionsType.SET_USER_DATA,
  payload,
});
export const fetchSignIn = (
  payload: LoginFormProps
): FetchSignInActionInterface => ({
  type: UserActionsType.FETCH_SIGN_IN,
  payload,
});

export const fetchSignUp = (
  payload: RegisterFormProps
): FetchSignUpActionInterface => ({
  type: UserActionsType.FETCH_SIGN_UP,
  payload,
});
export const signOut = (): SignOutActionInterface => ({
  type: UserActionsType.SIGN_OUT,
});
export const fetchUserData = (): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
});
export const setSearch = (payload: string): SetSearchActionInterface => ({
  type: UserActionsType.SET_SEARCH,
  payload,
});

export const setUserLoadingStatus = (
  payload: LoadingStatus,
  error: ErrorUser = undefined
): SetUserLoadingStatusActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
  error,
});

export const SetUserLoadingRegisterStatus = (
  payload: LoadingStatus,
  error: ErrorUser = undefined
): SetUserLoadingRegisterStatusActionInterface => ({
  type: UserActionsType.SET_LOADING_REGISTER_STATE,
  payload,
  error,
});
export const SetUserLoadingLoginStatus = (
  payload: LoadingStatus,
  error: ErrorUser = undefined
): SetUserLoadingLoginStatusActionInterface => ({
  type: UserActionsType.SET_LOADING_LOGIN_STATE,
  payload,
  error,
});
export const setUserPage = (
  payload: { id: string },
  error: ErrorUser = undefined
): SetUserPageActionInterface => ({
  type: UserActionsType.SET_USER_PAGE,
  payload,
});
export const addAvatar = (payload: string): AddAvatarActionInterface => ({
  type: UserActionsType.ADD_AVATAR,
  payload,
});
export const addBackground = (
  payload: string
): AddBackgroundActionInterface => ({
  type: UserActionsType.ADD_BACKGROUND,
  payload,
});
export const addPropToUserByPropName = (payload: {
  prop: keyof IEditInfo;
  value: ImageObj | string | null;
}) => ({
  type: UserActionsType.SET_PROP_USER,
  payload,
});

export type UserAction =
  | SetUserDataActionInterface
  | SetUserLoadingStatusActionInterface
  | SetUserLoadingRegisterStatusActionInterface
  | SetUserLoadingLoginStatusActionInterface
  | FetchSignInActionInterface
  | FetchSignUpActionInterface
  | SetUserPageActionInterface
  | AddAvatarActionInterface
  | AddBackgroundActionInterface
  | AddPropToUserByPropNameActionInterface
  | SetSearchActionInterface
  | SignOutActionInterface;
