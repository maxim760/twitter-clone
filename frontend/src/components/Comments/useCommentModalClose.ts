import { useState } from "react";
import { selectTweetCommentModal } from "../../store/ducks/tweet/selectors";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCommentModal,
  openCommentModal,
} from "../../store/ducks/tweet/actionCreators";

interface ICommentModal {
  isVisible: boolean;
  handleCloseModal(): void;
}

export const useCommentModalClose = (): ICommentModal => {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectTweetCommentModal);

  const handleCloseModal = () => dispatch(closeCommentModal());

  return { isVisible, handleCloseModal };
};
