import { UserState } from "./contracts/state";
import { RootState } from "../../rootReducer";
import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
import { selectUsers } from "../users/selectors";
// createSelector создает мемоизированную версию селектора
export const selectUser = (state: RootState): UserState => state.user;


export const selectUserLoadingStatus = (state: RootState) => selectUser(state).status
export const selectUserisLoaded = (state: RootState) => selectUser(state).status === "LOADED"
export const selectUserLoadingRegisterStatus = (state: RootState) => selectUser(state).registerStatus
export const selectUserLoadingLoginStatus = (state: RootState) => selectUser(state).loginStatus
export const selectUserSignInError = (state: RootState) => selectUser(state).loginError
export const selectUserSignUpError = (state: RootState) => selectUser(state).registerError
export const selectUserSearch = (state: RootState) => selectUser(state).search

export const selectUserData = (state: RootState) => selectUser(state).data
export const selectUserAvatar = (state: RootState) => selectUserData(state)?.avatar || null
export const selectUserBackground = (state: RootState) => selectUserData(state)?.background || null

export const selectUserPage = (state: RootState) => selectUser(state).userPage
export const selectUsername = (state: RootState) => selectUserData(state)?.username
export const selectUserId = (state: RootState) => selectUserData(state)?._id
export const selectIsAuth = (state: RootState) => (!!selectUser(state).data )
export const selectIsReady = (state: RootState) => {
  const status = selectUserLoadingStatus(state)
  return status !== LoadingStatus.LOADING && status !== LoadingStatus.NEVER
}