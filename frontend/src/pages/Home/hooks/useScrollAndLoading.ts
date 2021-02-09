import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectTweetsPage, selectTweetsLength, selectTweetsLoadingStatusIsLoading } from '../../../store/ducks/tweets/selectors';
import { fetchTweets } from '../../../store/ducks/tweets/actionCreators';
import { selectUserSearch } from '../../../store/ducks/user/selectors';
// valueQuery - пересоздавать юзЭффект если в поиске есть запрос и если нет
//TODO: ИСПРАВИТЬ ЧТОБЫ ВСЕГДА ГРУЗИТЬ 15 ТВИТОВ А НЕ ТОЛЬКО КОГДА ВСЕ ТВИТЫ ЕСТЬ И ТАМ ПОДРГУЖАТЬ
export const useScrollAndLoading = () => {
  const valueQuery = useSelector(selectUserSearch)
  const dispatch = useDispatch();
  const page = useSelector(selectTweetsPage);
  const tweetsLength = useSelector(selectTweetsLength);
  const isTweetsLoading = useSelector(selectTweetsLoadingStatusIsLoading);
  const fetchLimitTweets = () => dispatch(fetchTweets())

  
  React.useEffect(() => {
    if (page === 1) {
      fetchLimitTweets();
    }
  }, [dispatch, page]);

  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [page, tweetsLength, isTweetsLoading, Boolean(valueQuery)]);
  const scrollHandler = (e: any) => {
    const allHeight = e?.currentTarget?.documentElement.scrollHeight;
    const allHeightScroll =
      e?.currentTarget?.documentElement.scrollTop + window.innerHeight;
    if (
      allHeightScroll >= allHeight - 100 &&
      !isTweetsLoading &&
      page > 1 &&
      tweetsLength >= (page - 1) * 15 &&
      !valueQuery
    ) {
      fetchLimitTweets();
    }
  };
}