import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadingStatus } from "../store/types";
import { RootState } from "../store/rootReducer";
import { ErrorUser } from "../store/ducks/user/contracts/state";
import { useTranslation } from "react-i18next";

interface useAlertProps<T> {
  errorSelector: [(state: RootState) => ErrorUser, string];
  successMessage: string;
  callback: (data: T) => void;
  selector: (state: RootState) => LoadingStatus;
}

interface NotificationState {
  message: string;
  status: "error" | "success" | "info";
}

interface AlertData<T> {
  onSubmit: (data: T) => void;
  handleCloseNotification: () => void;
  visibleNotification: NotificationState | null;
  isVisibleNotification: boolean;
  isLoadingNotification: boolean

}

export const useAlert = <T extends unknown>({
  errorSelector,
  successMessage,
  callback,
  selector,
}: useAlertProps<T>): AlertData<T> => {
  const {t} = useTranslation(["form"])
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selector);
  const errorMessage = useSelector(errorSelector[0]);
  const isLoadingNotification = loadingStatus === LoadingStatus.LOADING
  const [
    visibleNotification,
    setVisibleNotification,
  ] = React.useState<NotificationState | null>(null);
  const handleCloseNotification = () => {
    setVisibleNotification(null);
  };
  const onSubmit = async (data: T) => {
    dispatch(callback(data));
  };
  

  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      setVisibleNotification({
        message: successMessage,
        status: "success",
      });
    } else if (loadingStatus === LoadingStatus.LOADING) {
      setVisibleNotification({ message: t("form:status.loading"), status: "info" });
    } else if (loadingStatus === LoadingStatus.ERROR) {
      setVisibleNotification({
        message: errorMessage ? errorMessage : errorSelector[1],
        status: "error",
      });
    }
  }, [loadingStatus]);

  return {
    onSubmit,
    handleCloseNotification,
    visibleNotification,
    isVisibleNotification: !!visibleNotification,
    isLoadingNotification
  };
};
