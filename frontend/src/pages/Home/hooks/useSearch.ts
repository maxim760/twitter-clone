import React from "react";
import { debounceEvent } from "../../../utils/debounceEvent";
import { TweetsApi } from "../../../services/api/tweetsApi";
import { TweetsState } from "../../../store/ducks/tweets/contracts/state";
import { useSelector, useDispatch } from "react-redux";
import { selectTweetsItems } from "../../../store/ducks/tweets/selectors";
import { setSearch } from "../../../store/ducks/user/actionCreators";

type TReturnData = {
  handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>): void;
  valueQuery: string;
};

export const useSearch = (msForDebounce: number = 800): TReturnData => {
  const dispatch = useDispatch();
  const [valueQuery, setValueQuery] = React.useState("");

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setValueQuery(e.target.value);
      delayHandler(e.target.value);
    }
  };

  const delayHandler = React.useCallback(
    debounceEvent((value) => {
      console.log(msForDebounce);
      dispatch(setSearch(value));
    }, msForDebounce),
    []
  ); // чтобы ссылка не терялась !!!

  return {
    handleChangeQuery,
    valueQuery,
  };
};
