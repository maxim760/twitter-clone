import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImageObj } from "../../../components/AddTweetForm";
import { RootState } from "../../../store/rootReducer";
import { IEditStatus } from "../../../store/ducks/edit/contracts/state";

interface IProps {
  setModalForPhoto(): void;
  setPhoto(arg: ImageObj): void;
  setPhotoUrl(arg: string): void;
  resetPhoto(): void;
  selectorEditPhoto: (state: RootState) => ImageObj | null;
  selectorUserCurrentUrl: (state: RootState) => string | null;
  selectorEditCurrentUrl: (state: RootState) => string | null;
}

type ReturnData = {
  handleSetModalForPhoto(): void;
  handleSetPhoto(arg: ImageObj): void;
  handleSetPhotoUrl(arg: string): void;
  handleResetPhoto(): void;
  editPhoto: ImageObj | null;
  userCurrentUrl: string | null;
  editCurrentUrl: string | null;
  finalFileRef: React.MutableRefObject<string | Blob | File | null>;
  photoRef: React.MutableRefObject<any>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export const useEditPhoto = ({
  setModalForPhoto,
  setPhoto,
  resetPhoto,
  setPhotoUrl,
  selectorEditPhoto,
  selectorUserCurrentUrl,
  selectorEditCurrentUrl,
}: IProps): ReturnData => {
  const dispatch = useDispatch();
  const handleSetModalForPhoto = () => dispatch(setModalForPhoto());
  const handleSetPhoto = (arg: ImageObj) => dispatch(setPhoto(arg));
  const handleSetPhotoUrl = (arg: string) => dispatch(setPhotoUrl(arg));
  const handleResetPhoto = () => dispatch(resetPhoto());
  const editPhoto = useSelector(selectorEditPhoto);
  const userCurrentUrl = useSelector(selectorUserCurrentUrl);
  const editCurrentUrl = useSelector(selectorEditCurrentUrl);
  const finalFileRef = React.useRef<null | string | Blob | File>(null);
  const photoRef = React.useRef(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return {
    handleSetModalForPhoto,
    handleSetPhoto,
    handleSetPhotoUrl,
    handleResetPhoto,
    editPhoto,
    userCurrentUrl,
    editCurrentUrl,
    finalFileRef,
    photoRef,
    inputRef,
  };
};
