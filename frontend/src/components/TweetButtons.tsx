import React from "react";
import classNames from "classnames";
import CommentIcon from "@material-ui/icons/ChatBubbleOutline";
import RepostIcon from "@material-ui/icons/RepeatRounded";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LikeFilledIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/ReplyOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useLike } from "../hooks/useLike";
import { useSelector } from "react-redux";
import { selectActiveTweetCommentsLength } from "../store/ducks/tweet/selectors";
import { selectTweetsDataCommentsLength } from "../store/ducks/tweets/selectors";

interface TweetButtonsProps {
  classes?: string[];
  id: string;
  handleOpenModal: ((e?: React.MouseEvent<HTMLElement>) => void) | null;
  isFullTweet?: boolean;
}

export const TweetButtons: React.FC<TweetButtonsProps> = ({
  classes = [],
  id,
  handleOpenModal,
  isFullTweet = false,
}): React.ReactElement => {
  const { youLike, count: countLikes, handleToggleLike } = useLike(id);
  const countComments = useSelector(selectTweetsDataCommentsLength(id));
  return (
    <>
      <div className={classNames(classes)}>
        <div>
          <IconButton
            onClick={handleOpenModal ? handleOpenModal : undefined}
            className={classNames("iconButton", "commentBtn")}
            aria-label="comment"
          >
            <CommentIcon className="icon" />
          </IconButton>
          <span className={"tweetButtonCount"}>{countComments || ""}</span>
        </div>
        <div>
          <IconButton
            className={classNames("iconButton", "repost")}
            aria-label="repost"
          >
            <RepostIcon className="icon" />
          </IconButton>
        </div>
        <div>
          <IconButton
            aria-label="like"
            className={classNames("iconButton", "like", { active: youLike })}
            onClick={handleToggleLike}
          >
            {youLike ? (
              <LikeFilledIcon className="icon" />
            ) : (
              <LikeIcon className="icon" />
            )}
          </IconButton>
          <span className={"tweetButtonCount"}>
            {countLikes ? countLikes : null}
          </span>
        </div>
        <div>
          <IconButton
            className={classNames("iconButton", "share")}
            aria-label="share"
          >
            <ShareIcon className="icon" />
          </IconButton>
        </div>
      </div>
    </>
  );
};
