import { LoadingStatus } from "../../../types";

export interface UserData {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  followers: number;
  followings: number;
  createdAt: string;
  token?: string;
  born?: string;
  confirmed?: boolean;
  location?: string;
  avatar?: string;
  background?: string;
  about?: string;
  website?: string;
}
export type UserRegister = Pick<UserData, "email" | "fullname" | "username" > & {password2: string, password: string}

export type ErrorUser = string | undefined | null

export interface UserState {
  data: UserData | null;
  userPage: null | {id:string}
  search: string
  status: LoadingStatus;
  loginStatus: LoadingStatus;
  registerStatus: LoadingStatus;
  loginError: ErrorUser;
  registerError: ErrorUser;
}
