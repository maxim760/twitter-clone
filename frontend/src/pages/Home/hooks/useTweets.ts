import React from "react";
import { debounceEvent } from "../../../utils/debounceEvent";
import { TweetsApi } from "../../../services/api/tweetsApi";
import { TweetsState } from "../../../store/ducks/tweets/contracts/state";
import { useSelector } from "react-redux";
import { selectTweetsItems } from "../../../store/ducks/tweets/selectors";
import { selectUserSearch } from "../../../store/ducks/user/selectors";

type TReturnData = {
  tweets: TweetsState["items"];
};

export const useTweets = (msForDebounce: number = 800): TReturnData => {
  const tweets = useSelector(selectTweetsItems);
  const searchText = useSelector(selectUserSearch);
  React.useEffect(() => {
    setApiTweets(tweets);
  }, [tweets]);
  const [apiTweets, setApiTweets] = React.useState<TweetsState["items"]>([]);

  React.useEffect(() => {
    async function getTweets() {
      if (searchText.length) {
        const tweetsAPI = await TweetsApi.fetchTweetsByQuery(searchText);
        setApiTweets(tweetsAPI);
      } else {
        setApiTweets(tweets);
      }
    }
    getTweets()
  }, [searchText]);
  return {
    tweets: apiTweets,
  };
};
