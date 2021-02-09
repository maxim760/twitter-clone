import React from "react";
import classNames from "classnames";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTweetData,
  clearTweetData,
} from "../../../store/ducks/tweet/actionCreators";
import {
  selectTweetData,
  selectTweetDataLoadingStatusIsLoading,
  selectTweetDataComments,
} from "../../../store/ducks/tweet/selectors";
import { useHomeStyles } from "../theme";
import CommentIcon from "@material-ui/icons/ChatBubbleOutline";
import RepostIcon from "@material-ui/icons/RepeatRounded";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ReplyOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import format from "date-fns/format";
import ruLang from "date-fns/locale/ru/index";

import { formatDate } from "../../../utils/formatDate";
import { ImageList } from "../../../components/ImageList";
import { getFirstChar } from "../../../utils/getFirstChar";
import { History } from "history";
import { setUserPage } from "../../../store/ducks/user/actionCreators";
import { getDateFnsLocale } from "../../../core/dateFns";
import { useTranslation } from "react-i18next";
import { AvatarUI } from "../../../components/ui/AvatarUI";
import { TweetButtons } from "../../../components/TweetButtons";
import { Comments } from "../../../components/Comments";
import { Divider } from "@material-ui/core";
import { CommentModal } from "../../../components/Comments/CommentModal";
import { useCommentModalOpen, ICommentModal } from "../../../components/Comments/useCommentModalOpen";
interface FullTweetProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const FullTweet: React.FC<FullTweetProps> = ({
  classes,
}): React.ReactElement | null => {
  const locale = getDateFnsLocale();
  console.log(locale, "locale")
  const { t } = useTranslation(["userPage"]);
  const params: { id: string } = useParams();
  const dispatch = useDispatch();
  const history: History = useHistory();

  React.useEffect(() => {
    dispatch(fetchTweetData(params.id));

    return () => {
      dispatch(clearTweetData());
    };
  }, [dispatch, params.id]);
  const tweetData = useSelector(selectTweetData);
  const tweetIsLoading = useSelector(selectTweetDataLoadingStatusIsLoading);
  const handleGetProfile = (tweetData: any) => {
    dispatch(setUserPage({ id: tweetData.user._id }));
    history.push(`/user/${tweetData.user._id}`);
  };
    
    let openModal = tweetData ? useCommentModalOpen({
      text: tweetData.text,
      images: tweetData?.images,
      whoAnswer: tweetData.user,
      user: tweetData.user,
      createdAt: tweetData.createdAt,
      tweetId: params.id
    }) : null
  return tweetIsLoading ? (
    <div className={classes.centeredBig}>
      <CircularProgress />
    </div>
  ) : tweetData !== null ? (
    <>
      <Paper className={classes.fullTweet} variant="outlined" component="div">
        <Paper className={classes.fullTweetMain} variant="outlined">
          <div
            onClick={handleGetProfile.bind(null, tweetData)}
            style={{ cursor: "pointer" }}
            className={classNames(classes.tweetsHeaderUser)}
          >
            <AvatarUI
              className={classes.tweetUserAvatar}
              username={tweetData.user.username}
              avatar={tweetData.user.avatar}
            />

            <div>
              <b>{tweetData.user.fullname}</b>
              <div>
                <span className={classes.tweetUserName}>
                  @{tweetData.user.username}
                </span>
                &nbsp;
                <span className={classes.tweetUserName}>&nbsp;·&nbsp;</span>
                &nbsp;
                <span className={classes.tweetUserName}>
                  {formatDate(new Date(tweetData.createdAt))}
                </span>
                &nbsp;
              </div>
            </div>
          </div>
          <Typography
            className={classes.fullTweetText}
            variant="body1"
            gutterBottom
          >
            {tweetData.text}
          </Typography>
          <div className="tweets-images">
            <ImageList images={tweetData.images || []} />
          </div>
          <Typography className={classes.tweetUserDate}>
            <span className={classes.tweetUserName}>
              {format(Date.parse(tweetData.createdAt), "H:mm")}&nbsp;·&nbsp;
              {t("userPage:date", {
                date: format(Date.parse(tweetData.createdAt), "d LLL y", {
                  locale,
                }),
              })}
            </span>
          </Typography>
        </Paper>
          <TweetButtons
          classes={[classes.tweetButtons, classes.fullTweetButtons]}
            id={params.id}
            handleOpenModal={openModal?.handleOpenModal || null}
        />
      </Paper>
      <Divider />
      <Comments />
    </>
  ) : null;
};
