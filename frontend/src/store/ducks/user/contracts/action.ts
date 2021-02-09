import { Action } from "redux";
import { UserData, ErrorUser } from "./state";
import { LoadingStatus } from "../../../types";
import {
  LoginFormProps,
  RegisterFormProps,
} from "../../../../pages/Signin/components/types";
import { IEditInfo } from "../../edit/contracts/state";
import { ImageObj } from "../../../../components/AddTweetForm";

export enum UserActionsType {
  SET_USER_DATA = "user/SET_USER_DATA",
  SET_SEARCH = "user/SET_SEARCH",
  FETCH_SIGN_IN = "user/FETCH_SIGN_IN",
  FETCH_SIGN_UP = "user/FETCH_SIGN_UP",
  SIGN_OUT = "user/SIGN_OUT",
  FETCH_USER_DATA = "user/FETCH_USER_DATA",
  SET_LOADING_STATE = "user/SET_LOADING_STATE",
  SET_LOADING_REGISTER_STATE = "user/SET_LOADING_REGISTER_STATE",
  SET_LOADING_LOGIN_STATE = "user/SET_LOADING_LOGIN_STATE",

  SET_USER_PAGE = "user/SET_USER_PAGE",

  ADD_AVATAR = "user/ADD_AVATAR",
  ADD_BACKGROUND = "user/ADD_BACKGROUND",
  SET_PROP_USER = "user/SET_PROP_USER",
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_USER_DATA;
  payload: UserData | null;
}
export interface SetSearchActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_SEARCH;
  payload: string;
}
export interface FetchSignInActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_IN;
  payload: LoginFormProps;
}
export interface SignOutActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SIGN_OUT;
}
export interface FetchSignUpActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_UP;
  payload: RegisterFormProps;
}
export interface FetchUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_DATA;
}
export interface SetUserLoadingStatusActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
  error?: ErrorUser;
}
export interface SetUserLoadingRegisterStatusActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_REGISTER_STATE;
  payload: LoadingStatus;
  error?: ErrorUser;
}
export interface SetUserLoadingLoginStatusActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_LOGIN_STATE;
  payload: LoadingStatus;
  error?: ErrorUser;
}
export interface SetUserPageActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_USER_PAGE;
  payload: { id: string };
}

export interface AddAvatarActionInterface extends Action<UserActionsType> {
  type: UserActionsType.ADD_AVATAR;
  payload: string;
}
export interface AddBackgroundActionInterface extends Action<UserActionsType> {
  type: UserActionsType.ADD_BACKGROUND;
  payload: string;
}
export interface AddPropToUserByPropNameActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_PROP_USER;
  payload: {
    prop: keyof IEditInfo;
    value: ImageObj | string | null;
  };
}
