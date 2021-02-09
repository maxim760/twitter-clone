import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastUsers } from "../../store/ducks/users/actionCreators";
import {
  selectUsersItems,
  selectUsersLoadingStatus,
  selectLastUsers,
} from "../../store/ducks/users/selectors";
import { UsersState } from "../../store/ducks/users/contracts/state";
import { LoadingStatus } from "../../store/types";

interface ReturnData {
  users: UsersState["lastUsers"]
  loadingStatus:LoadingStatus
}

export const useUsers = (): ReturnData => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchLastUsers(5));
  }, []);
  const users = useSelector(selectLastUsers);
  const loadingStatus = useSelector(selectUsersLoadingStatus);
  return {
    users,
    loadingStatus,
  }
};
