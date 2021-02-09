import React from "react";

import Paper from "@material-ui/core/Paper";
import CommentIcon from "@material-ui/icons/ChatBubbleOutline";
import RepostIcon from "@material-ui/icons/RepeatRounded";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ReplyOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useHomeStyles } from "../pages/Home/theme";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { formatDate } from "../utils/formatDate";
import { useHistory } from "react-router-dom";
import { ImageList } from "./ImageList";
import { useSelector } from "react-redux";
import { selectRemovingStateEqualLoading } from "../store/ducks/tweets/selectors";
import { selectUsername } from "../store/ducks/user/selectors";
import { getFirstChar } from "../utils/getFirstChar";
import { TweetMenu } from "./TweetMenu";
import { AvatarUI } from "./ui/AvatarUI";
import { TweetButtons } from "./TweetButtons";
import { ILike } from "../store/ducks/tweets/contracts/state";
import { tweetReducer } from "../store/ducks/tweet/reducer";
import { useCommentModalOpen } from "./Comments/useCommentModalOpen";
import { UserData } from "../store/ducks/user/contracts/state";

interface TweetProps {
  _id: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string;
  likes: ILike
  user: UserData;
  text: string;
  images?: string[];
}

export const Tweet: React.FC<TweetProps> = ({
  _id,
  classes,
  user,
  text,
  createdAt,
  images,
  likes
}): React.ReactElement => {

  const history = useHistory();
  const currentUser = useSelector(selectUsername);
  const isRemoving = useSelector(selectRemovingStateEqualLoading);
  const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // на нем работает, на тех что ниже и там есть события это событие уже не всплывает
    history.push(`/home/tweet/${_id}`);
  };

  const { handleOpenModal } = useCommentModalOpen({text,images,whoAnswer: user,user,createdAt, tweetId: _id});

  return (
    <a
      className={classes.tweetWrapper}
      onClick={handleClickTweet}
      href={`/home/tweet/${_id}`}
    >
      <Paper
        className={classNames(classes.tweetsWrapperBody, classes.tweet)}
        variant="outlined"
      >

        <AvatarUI className={classes.tweetAvatar} avatar={user.avatar} username={user.username} />
        <div className={classes.tweetText}>
          <Typography className={classes.tweetHeader} component={"div"}>
            <div>
              <b>{user.fullname}</b>&nbsp;
              <span className={classes.tweetUserName}>@{user.username}</span>
              <span className={classes.tweetUserName}>&nbsp;·&nbsp;</span>
              <span className={classes.tweetUserName}>
                {formatDate(new Date(createdAt))}
              </span>
            </div>
            {user.username === currentUser ? (
              <TweetMenu classes={classes} isRemoving={isRemoving} id={_id} />
            ) : null}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.tweetFieldText}
            component="div"
          >
            {text}
            {images?.length ? <ImageList images={images} /> : null}
          </Typography>
          <TweetButtons classes={[classes.tweetButtons]} id={_id} handleOpenModal={handleOpenModal}  />
        </div>
      </Paper>
    </a>
  );
};
