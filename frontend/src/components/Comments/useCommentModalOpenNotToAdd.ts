import { useState } from "react";
import { selectTweetCommentModal } from "../../store/ducks/tweet/selectors";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCommentModal,
  openCommentModal,
  setActiveReply,
} from "../../store/ducks/tweet/actionCreators";

export interface ICommentModal {
  handleOpenModal(e?: React.MouseEvent<HTMLElement>): void;
}

export const useCommentModalOpenNotToAdd = (): ICommentModal => {
  const dispatch = useDispatch();

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openCommentModal());
  };

  return { handleOpenModal };
};
