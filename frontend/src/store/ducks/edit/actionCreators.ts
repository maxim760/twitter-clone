import { EditState, IEditInfo } from "./contracts/state";
import { Action } from "redux";
import { LoadingStatus } from "../../types";
import { ImageObj } from "../../../components/AddTweetForm";

// структура : 1 енам который держит все типы, интерфейс каждой экшн и сам экшн каждый и 1 тип который все экшны содержит
// то что есть 1 енам очень классно, просто в него  все добавляем и всё!!!, не надо доп экспортов и тд
export enum EditActionsType {
  RESET_ALL = "edit/RESET_ALL",
  SET_AVATAR = "edit/SET_AVATAR",
  RESET_AVATAR = "edit/RESET_AVATAR",
  SET_BACKGROUND = "edit/SET_BACKGROUND",
  RESET_BACKGROUND = "edit/RESET_BACKGROUND",
  SET_ABOUT = "edit/SET_ABOUT",
  RESET_ABOUT = "edit/RESET_ABOUT",
  SET_WEBSITE = "edit/SET_WEBSITE",
  RESET_WEBSITE = "edit/RESET_WEBSITE",
  SET_BIRTHDAY = "edit/SET_BIRTHDAY",
  RESET_BIRTHDAY = "edit/RESET_BIRTHDAY",
  SET_FULLNAME = "edit/SET_FULLNAME",
  RESET_FULLNAME = "edit/RESET_FULLNAME",
  SET_LOCATION = "edit/SET_LOCATION",
  RESET_LOCATION = "edit/RESET_LOCATION",
  SET_EDIT_AVATAR = "edit/SET_EDIT_AVATAR",
  SET_EDIT_BACKGROUND = "edit/SET_EDIT_BACKGROUND",
  SET_NOT_IS_EDIT = "edit/SET_NOT_IS_EDIT",
  SET_AVATAR_URL = "edit/SET_AVATAR_URL",
  SET_BACKGROUND_URL = "edit/SET_BACKGROUND_URL",
  SET_PROP_EDIT = "edit/SET_PROP_EDIT",
}

export interface ResetAllActionInterface extends Action<EditActionsType> {
  type: EditActionsType.RESET_ALL;
}
export interface ResetAvatarActionInterface extends Action<EditActionsType> {
  type: EditActionsType.RESET_AVATAR;
}
export interface SetAvatarActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_AVATAR;
  payload: ImageObj;
}
export interface SetAvatarUrlActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_AVATAR_URL;
  payload: string;
}
export interface ResetBackgroundActionInterface
  extends Action<EditActionsType> {
  type: EditActionsType.RESET_BACKGROUND;
}
export interface SetBackgroundActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_BACKGROUND;
  payload: ImageObj;
}
export interface SetBackgroundUrlActionInterface
  extends Action<EditActionsType> {
  type: EditActionsType.SET_BACKGROUND_URL;
  payload: string;
}
export interface ResetAboutActionInterface extends Action<EditActionsType> {
  type: EditActionsType.RESET_ABOUT;
}
export interface SetAboutActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_ABOUT;
  payload: string;
}
export interface ResetWebsiterActionInterface extends Action<EditActionsType> {
  type: EditActionsType.RESET_WEBSITE;
}
export interface SetWebsiterActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_WEBSITE;
  payload: string;
}
export interface ResetFullnameActionInterface extends Action<EditActionsType> {
  type: EditActionsType.RESET_FULLNAME;
}
export interface SetFullnameActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_FULLNAME;
  payload: string;
}
export interface ResetLocationActionInterface extends Action<EditActionsType> {
  type: EditActionsType.RESET_LOCATION;
}
export interface SetLocationActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_LOCATION;
  payload: string;
}
export interface ResetBirthdayInterface extends Action<EditActionsType> {
  type: EditActionsType.RESET_BIRTHDAY;
}
export interface SetBirthdayInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_BIRTHDAY;
  payload: string;
}
export interface SetPropEditByPropNameActionInterface
  extends Action<EditActionsType> {
  type: EditActionsType.SET_PROP_EDIT;
  payload: { prop: string; value: string };
}
export interface SetEditAvatarModalActionInterface
  extends Action<EditActionsType> {
  type: EditActionsType.SET_EDIT_AVATAR;
}
export interface SetEditBackgroundModalActionInterface
  extends Action<EditActionsType> {
  type: EditActionsType.SET_EDIT_BACKGROUND;
}
export interface SetNotIsEditActionInterface extends Action<EditActionsType> {
  type: EditActionsType.SET_NOT_IS_EDIT;
  payload: string;
}

export const resetAllEdit = () => ({
  type: EditActionsType.RESET_ALL,
});
export const resetAvatarEdit = () => ({
  type: EditActionsType.RESET_AVATAR,
});
export const setAvatarEdit = (payload: ImageObj) => ({
  type: EditActionsType.SET_AVATAR,
  payload,
});
export const setAvatarEditUrl = (payload: string) => ({
  type: EditActionsType.SET_AVATAR_URL,
  payload,
});
export const resetBackgroundEdit = () => ({
  type: EditActionsType.RESET_BACKGROUND,
});
export const setBackgroundEdit = (payload: ImageObj) => ({
  type: EditActionsType.SET_BACKGROUND,
  payload,
});
export const setBackgroundEditUrl = (payload: string) => ({
  type: EditActionsType.SET_BACKGROUND_URL,
  payload,
});
export const resetAboutEdit = () => ({
  type: EditActionsType.RESET_ABOUT,
});
export const setAboutEdit = (payload: string) => ({
  type: EditActionsType.SET_ABOUT,
  payload,
});
export const resetWebsiterEdit = () => ({
  type: EditActionsType.RESET_WEBSITE,
});
export const setWebsiterEdit = (payload: string) => ({
  type: EditActionsType.SET_WEBSITE,
  payload,
});
export const resetFullnameEdit = () => ({
  type: EditActionsType.RESET_FULLNAME,
});
export const setFullnameEdit = (payload: string) => ({
  type: EditActionsType.SET_FULLNAME,
  payload,
});
export const resetLocationEdit = () => ({
  type: EditActionsType.RESET_LOCATION,
});
export const setLocationEdit = (payload: string) => ({
  type: EditActionsType.SET_LOCATION,
  payload,
});
export const resetBirthdayEdit = () => ({
  type: EditActionsType.RESET_BIRTHDAY,
});
export const setBirthdayEdit = (payload: string) => ({
  type: EditActionsType.SET_BIRTHDAY,
  payload,
});
export const setPropEditByPropName = (payload: {
  prop: keyof IEditInfo;
  value: ImageObj | string | null;
}) => ({
  type: EditActionsType.SET_PROP_EDIT,
  payload,
});

export const setEditModalToAvatar = () => ({
  type: EditActionsType.SET_EDIT_AVATAR,
});
export const setEditModalToBackground = () => ({
  type: EditActionsType.SET_EDIT_BACKGROUND,
});
export const setNotIsEdit = () => ({
  type: EditActionsType.SET_NOT_IS_EDIT,
});

export type EditAction =
  | ResetAllActionInterface
  | ResetAvatarActionInterface
  | SetAvatarActionInterface
  | ResetBackgroundActionInterface
  | SetBackgroundActionInterface
  | ResetAboutActionInterface
  | SetAboutActionInterface
  | ResetWebsiterActionInterface
  | SetWebsiterActionInterface
  | ResetFullnameActionInterface
  | SetFullnameActionInterface
  | ResetLocationActionInterface
  | SetLocationActionInterface
  | ResetBirthdayInterface
  | SetBirthdayInterface
  | SetEditBackgroundModalActionInterface
  | SetEditAvatarModalActionInterface
  | SetNotIsEditActionInterface
  | SetAvatarUrlActionInterface
  | SetBackgroundUrlActionInterface
  | SetPropEditByPropNameActionInterface;
