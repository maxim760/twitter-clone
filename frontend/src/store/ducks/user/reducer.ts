import produce, { Draft } from "immer"
import {  UserState, ErrorUser } from "./contracts/state"
import { UserAction } from "./actionCreators"
import { UserActionsType } from "./contracts/action"
import { LoadingStatus } from "../../types"

const initialUserState: UserState = {
  data: null,
  status: LoadingStatus.NEVER,
  userPage: null,
  search:"",
  registerStatus: LoadingStatus.NEVER,
  loginStatus: LoadingStatus.NEVER,
  loginError: undefined,
  registerError: undefined
}


// + иммера в том, что не надо прописывать return
// и прописывают только то что изменяю, нет кучи спрэдов
export const userReducer = produce((draft: Draft<UserState>, action: UserAction): void => {
  switch (action.type) {
    case UserActionsType.SET_USER_DATA: {
      draft.data = action.payload
      draft.status = LoadingStatus.SUCCESS
      break
    }
    case UserActionsType.FETCH_SIGN_IN: {
      draft.loginStatus = LoadingStatus.LOADING
      break
    }
    case UserActionsType.FETCH_SIGN_UP: {
      draft.registerStatus = LoadingStatus.LOADING
      break
    }
    case UserActionsType.SIGN_OUT: {
      draft.registerStatus = LoadingStatus.LOADED
      draft.data = null
      break
    }
    case UserActionsType.SET_LOADING_STATE: {
      draft.status = action.payload
      break
    }
    case UserActionsType.SET_LOADING_REGISTER_STATE: {
      draft.registerStatus = action.payload
      draft.registerError = action.error
      break
    }
    case UserActionsType.SET_LOADING_LOGIN_STATE: {
      draft.loginStatus = action.payload
      draft.loginError = action.error
      break
    }
    case UserActionsType.SET_USER_PAGE: {
      draft.userPage = action.payload
      break
    }
    case UserActionsType.ADD_AVATAR: {
      if (draft.data) {
        draft.data.avatar = action.payload
      }
      break
    }
    case UserActionsType.ADD_BACKGROUND: {
      if (draft.data) {
        draft.data.background = action.payload
      }
      break
    }
    case UserActionsType.SET_SEARCH: {
      draft.search = action.payload
      break
    }
    case UserActionsType.SET_PROP_USER: {
      const { prop, value } = action.payload
      if (draft.data && prop in draft.data && value) {
        // @ts-ignore
        draft.data[prop] = value;
      }
      break;
    }
    default:
      const x: never = action
      break
  }

}, initialUserState)

// export type tweetsType = ReturnType<typeof tweetsReducer> 
// пригодился если бы не юзали селекторы