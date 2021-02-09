import { useState } from "react";
import { selectTweetCommentModal } from "../../store/ducks/tweet/selectors";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCommentModal,
  openCommentModal,
  setActiveReply,
} from "../../store/ducks/tweet/actionCreators";
import { IActiveReply } from "../../store/ducks/tweet/contracts/state";

export interface ICommentModal {
  handleOpenModal(e?: React.MouseEvent<HTMLElement>): void;
}

export const useCommentModalOpen = (reply: IActiveReply): ICommentModal => {
  const dispatch = useDispatch();

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setActiveReply(reply))
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(openCommentModal());
  };

  return { handleOpenModal };
};
