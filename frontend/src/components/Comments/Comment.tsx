import React from "react";
import "./comments.css";
import { AvatarUI } from "../ui/AvatarUI";
import MoreIcon from "@material-ui/icons/MoreHorizOutlined";

import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  IconButton,
  TextareaAutosize,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useMenu } from "./useMenu";
import { ICommentItem, ILike } from "../../store/ducks/tweets/contracts/state";
import { getDateFnsLocale } from "../../core/dateFns";
import format from "date-fns/format";
import { ImageList } from "../ImageList";
import { ModalBlock } from "../ModalBlock";
import { useCommentModalOpen } from "./useCommentModalOpen";
import { useDispatch } from "react-redux";
import { CommentButtons } from "./CommentButtons";
import { TweetButtons } from "../TweetButtons";
import { AddCommentForm } from "./addCommentForm";
import { fetchRemoveComment } from "../../store/ducks/tweet/actionCreators";
import { UserData } from "../../store/ducks/user/contracts/state";

// interface ICommentProps {
//   _id: string;
//   user: UserData;
//   whoAnswer: UserData;
//   tweetId: string;
//   text: string;
//   images?: string[];
//   createdAt: string;
//   likes: ILike;
// }

export const Comment: React.FC<ICommentItem> = ({
  text,
  images = [],
  whoAnswer,
  user,
  createdAt,
  _id,
  tweet,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const locale = getDateFnsLocale();
  const { t } = useTranslation(["buttons", "comment"]);
  const { anchorEl, handleCloseMenu, open, handleOpenMenu } = useMenu();
  const [visible, setVisible] = React.useState(false);
  const { handleOpenModal } = useCommentModalOpen({
    text,
    images,
    whoAnswer,
    user,
    createdAt,
  tweetId: tweet,
  });

  const handleOpenEditComModal = () => {
    setVisible(true);
    handleCloseMenu();
  };
  const handleCloseEditComModal = () => setVisible(false);

  const handleRemoveComment = () => {
    handleCloseMenu();
    if (window.confirm("Вы уверены?")) {
      dispatch(fetchRemoveComment(_id));
    }
  };

  return (
    <div className="comment">
      <AvatarUI
        username={user?.username || ""}
        avatar={user?.avatar}
        className={"comment__avatar"}
      />
      <div className="comment__main">
        <div className="comment__user-header">
          <div>
            <span className="comment__user">
              <b>{user?.fullname}</b>&nbsp;@{user?.username}&nbsp;·&nbsp;
              {format(Date.parse(createdAt), "d LLL", {
                locale,
              })}
            </span>

            <span className="comment__user">
              {t("comment:replyTo")}&nbsp;
              {whoAnswer ? (
                <Link className="link" to={`/user/${whoAnswer._id}`}>
                  @{whoAnswer.username}
                </Link>
              ) : null}
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <Menu
              className={"comment__buttonMenu"}
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleOpenEditComModal}>
                {t("buttons:edit")}
              </MenuItem>
              <MenuItem onClick={handleRemoveComment}>
                {t("buttons:delete")}
              </MenuItem>
            </Menu>
            <IconButton className="comment__more" onClick={handleOpenMenu}>
              <MoreIcon />
            </IconButton>
          </div>
        </div>
        <div className="comment__text">
          {text}
          {images?.length ? <ImageList images={images} /> : null}
        </div>

        <CommentButtons
          id={_id}
          classes={["comment__buttons"]}
          handleOpenModal={handleOpenModal}
        />
      </div>
      <ModalBlock
        visible={visible}
        title={t("buttons:edit")}
        onClose={handleCloseEditComModal}
      >
        <AddCommentForm
          rows={4}
          images={images}
          text={text}
          isEdit
          id={_id}
          handleCloseEditModal={handleCloseEditComModal}
        />
      </ModalBlock>
    </div>
  );
};

//TODO при добавлении коммпнта чтобы +1 отображалось в твит баттонс как ни будь плз и пре удолении тожа
