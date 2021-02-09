import { useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";
import { selectUserId } from "../../store/ducks/user/selectors";
import { CommentsApi } from "../../services/api/commentsApi";


type ReturnedData = {
  handleToggleLike(e: any): void;
  count: number;
  youLike: boolean;
};

interface IState {
  count: number;
  youLike: boolean;
}

export const useLikeOnComment = (id: string): ReturnedData => {
  const userId = useSelector(selectUserId)
  const [like, setLike] = useState<IState>({
    count: 0,
    youLike: false,
  });

  useEffect(() => {
    async function getLikes() {
      // запрос на коммент фетч
      // както выводить лайки на комменты
      const data = await CommentsApi.fetchGetComment(id)
      if (data) {
        const { count, from } = data.likes;
        const youLike = from.some(likersId => likersId === userId)
        setLike({
          count,
          youLike
        });
      }
    }
    getLikes();
  }, []);

  const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setLike((prev: IState) => {
      let obj: Partial<IState> = {};
      obj.youLike = !prev.youLike;
      obj.count = prev.youLike ? prev.count - 1 : prev.count + 1;
      return obj as IState;
    });
    CommentsApi.fetchLike(id);
  };

  return {
    handleToggleLike,
    count: like.count,
    youLike: like.youLike,
  };
};
