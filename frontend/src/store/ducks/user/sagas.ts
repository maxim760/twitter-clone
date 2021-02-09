import { put, takeLatest, call } from "redux-saga/effects";
import {
  setUserLoadingStatus,
  setUserData,
  SetUserLoadingRegisterStatus,
  SetUserLoadingLoginStatus,
} from "./actionCreators";
import { AuthApi } from "../../../services/api/authApi";
import { UserState, UserData } from "./contracts/state";
import {
  UserActionsType,
  FetchSignInActionInterface,
  FetchSignUpActionInterface,
} from "./contracts/action";
import { SagaIterator } from "redux-saga";
import { LoadingStatus } from "../../types";

export function* watchFetchUser() {
  yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInWorker);
  yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpWorker);
  yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataWorker);
}

function* fetchSignInWorker({
  payload,
}: FetchSignInActionInterface): SagaIterator {
  try {
    const data: UserState = yield call(AuthApi.signIn, payload);
    yield put(setUserData(data.data)); // если все норм, добавляю токен
    data?.data?.token &&
      window.localStorage.setItem("token", `${data?.data?.token}`);
    yield put(SetUserLoadingLoginStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(
      SetUserLoadingLoginStatus(
        LoadingStatus.ERROR,
        error.response.data.message
      )
    );
  }
}

function* fetchSignUpWorker({
  payload,
}: FetchSignUpActionInterface): SagaIterator {
  try {
    yield call(AuthApi.signUp, payload);
    yield put(SetUserLoadingRegisterStatus(LoadingStatus.SUCCESS)); // эти даннные о зарегистрировашихся хранятся только в монго, в редаксе не нужны
  } catch (error) {
    const response = error.response.data.message;
    let message: null | string = null;

    if (response.name === "MongoError") {
      const errorReason = Object.entries(response.keyValue)[0];
      switch (errorReason[0]) {
        case "email":
          message = `Почта ${errorReason[1]} уже используется`;
          break;
        case "username":
          message = `Никнейм ${errorReason[1]} занят`;
          break;
        default:
          message = "Ошибка";
      }
    } else if (response[0]?.msg) {
      message = response.map(({ msg }: { msg: string }) => `${msg}`).join("; ");
    } else {
      message = "Ошибка";
    }

    yield put(SetUserLoadingRegisterStatus(LoadingStatus.ERROR, message));
  }
}

function* fetchUserDataWorker(): SagaIterator {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const data: UserState = yield call(AuthApi.getMe);
    yield put(setUserData(data.data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}
