import React from "react";
import "./comments.css";
import { AvatarUI } from "../ui/AvatarUI";
import { TweetButtons } from "../TweetButtons";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useMenu } from "./useMenu";
import { useSelector } from "react-redux";
import { selectTweetDataComments, selectTweetDataCommentsItems } from "../../store/ducks/tweet/selectors";
import { Comment } from "./Comment";
import { CommentModal } from "./CommentModal";
interface CommentProps {}

export const Comments: React.FC<CommentProps> = ({ }): React.ReactElement | null => {
  const comments = useSelector(selectTweetDataCommentsItems);
  if (!comments) {
    return null;
  }
  console.log(comments)
  return (
    <>
      {comments.map((commentsProps) => (
        <Comment key={commentsProps._id} {...commentsProps} />
      ))}
    </>
  );
};
