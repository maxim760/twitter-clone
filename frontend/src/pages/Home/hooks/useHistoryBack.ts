import { useHistory } from "react-router-dom";
import { History } from "history";

type TReturnData = {
  handleBack():void;
};

export const useHistoryBack = (): TReturnData => {
  const history: History = useHistory();
  const handleBack = () => {
    history.go(-1);
  };
  return { handleBack };
};
