import produce, { Draft } from "immer"
import { UsersState } from "./contracts/state"
import { UsersAction } from "./actionCreators"
import { UsersActionType } from "./contracts/action"
import { LoadingStatus } from "../../types"

const initialUsersState: UsersState = {
  users: [],
  lastUsers: [],
  loadingState: LoadingStatus.NEVER,
}


// + иммера в том, что не надо прописывать return
// и прописывают только то что изменяю, нет кучи спрэдов
export const usersReducer = produce((draft: Draft<UsersState>, action: UsersAction): void => {
  switch (action.type) {
    case UsersActionType.SET_USERS: {
      draft.users = action.payload
      draft.loadingState = LoadingStatus.LOADED
      break
    }
    case UsersActionType.FETCH_USERS: {
      draft.loadingState = LoadingStatus.LOADING
      break
    }
    case UsersActionType.SET_LAST_USERS: {
      draft.lastUsers = action.payload
      draft.loadingState = LoadingStatus.LOADED
      break
    }
    case UsersActionType.FETCH_LAST_USERS: {
      draft.loadingState = LoadingStatus.LOADING
      break
    }
    case UsersActionType.SET_LOADING_STATE: {
      draft.loadingState = action.payload
      break
    }
    default:
      const x: never = action
      break
  }

}, initialUsersState)

// export type usersType = ReturnType<typeof usersReducer> 
// пригодился если бы не юзали селекторы