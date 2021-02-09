import { UsersState } from "./contracts/state";
import { RootState } from "../../rootReducer";
import { LoadingStatus } from "../../types";
// createSelector создает мемоизированную версию селектора
export const selectUsers = (state: RootState): UsersState => state.users;


export const selectUsersLoadingStatus = (state: RootState): LoadingStatus => selectUsers(state).loadingState
export const selectLastUsers = (state: RootState): UsersState["lastUsers"] => selectUsers(state).lastUsers


export const selectUsersItems = (state: RootState) => selectUsers(state).users
