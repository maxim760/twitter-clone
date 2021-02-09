import React from "react";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { getDateFnsLocale } from "../../core/dateFns";
import { UserState, UserData } from "../../store/ducks/user/contracts/state";
import { AvatarUI } from "../ui/AvatarUI";
import { Link } from "react-router-dom";
import { ImageList } from "..";
import { selectTweetActiveReply } from "../../store/ducks/tweet/selectors";
import { useSelector } from "react-redux";


export const CommentModalInner: React.FC = (): React.ReactElement | null => {
  const locale = getDateFnsLocale();
  const { t } = useTranslation(["comment"]);
  const reply = useSelector(selectTweetActiveReply);
  if (!reply) {
    return null;
  }
  const { user, createdAt, whoAnswer, text, images } = reply;
  return (
    <div className="comment__modal">
      <AvatarUI
        username={user?.username || ""}
        avatar={user?.avatar}
        className={"comment__avatar"}
      />
      <div className="comment__main">
        <span className="comment__user">
          <b>{user?.fullname}</b>&nbsp;@{user?.username}&nbsp;·&nbsp;
          {t("comment:date", {
            date: format(Date.parse(createdAt), "d LLL", {
              locale,
            }),
          })}
        </span>
        <div className="comment__text">
          {text}
          {images?.length ? <ImageList images={images} /> : null}
        </div>
        <span className="comment__user comment__reply">
          {t("comment:replyTo")}&nbsp;
          {whoAnswer ? (
            <Link className="link" to={`/user/${whoAnswer._id}`}>
              @{whoAnswer.username}
            </Link>
          ) : null}
        </span>
      </div>
    </div>
  );
};
