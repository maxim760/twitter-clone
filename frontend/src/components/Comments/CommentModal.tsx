import React, { useRef, useState } from "react";
import { ModalBlock } from "../ModalBlock";
import { useCommentModalClose } from "./useCommentModalClose";
import { CommentModalInner } from "./CommentModalInner";
import { selectUserData } from "../../store/ducks/user/selectors";
import { useSelector } from "react-redux";
import { UserData } from "../../store/ducks/user/contracts/state";
import { AvatarUI } from "../ui/AvatarUI";
import { TextField } from "@material-ui/core";
import { AddTweetForm } from "../AddTweetForm";
import { EmojiList } from "../EmojiList";
import { AddCommentForm } from "./addCommentForm";

interface CommentModalProps {}

export const CommentModal: React.FC<CommentModalProps> = (): React.ReactElement => {
  const { isVisible, handleCloseModal } = useCommentModalClose();
  const { username, avatar } = useSelector(selectUserData) as UserData;
  const textRef = useRef(null);
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <ModalBlock visible={isVisible} onClose={handleCloseModal}>
      <CommentModalInner />
      <AddCommentForm rows={4} />
    </ModalBlock>
  );
};
