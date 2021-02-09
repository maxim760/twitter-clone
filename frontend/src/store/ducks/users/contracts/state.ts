import { LoadingStatus } from "../../../types";

export interface UserRead {
  _id: string;
  createdAt: string;
  fullname: string;
  username: string;
  avatar?: string;
  text: string;
  location?: string;
  background?: string;
  website?: string;
  about?: string;
}

export interface UsersState {
  users: UserRead[];
  lastUsers: UserRead[];
  loadingState: LoadingStatus;
}
