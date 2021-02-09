import React from "react";
import PhotoIcon from "@material-ui/icons/CameraAltOutlined";
import RemoveIcon from "@material-ui/icons/ClearOutlined";
import { IconButton } from "@material-ui/core";

import { ImageObj } from "../../../components/AddTweetForm";
import { useDispatch } from "react-redux";
import { urlFromPhoto } from "../../../utils/urlFromPhoto";

interface ButtonsForEditUserProps {
  imageForCheck: null | ImageObj;
  photoUrl: string | null;
  handleResetPhoto(): void;
  setEditModal(): void;
  setEditPhoto(payload: ImageObj): void;
  inputRef: any;
}

export const ButtonsForEditUser: React.FC<ButtonsForEditUserProps> = ({
  imageForCheck,
  handleResetPhoto,
  photoUrl,
  setEditModal,
  setEditPhoto,
  inputRef
}) => {
  const dispatch = useDispatch()
  const handleChange = (e: any) => {
    const target = e.target;
    const file = target.files[0];
    if (file) {
      dispatch(
        setEditPhoto({
          url: urlFromPhoto(file),
          file,
        })
      );
      dispatch(setEditModal());
    }
  };
  const handleCallInputFile = () => {
    inputRef?.current && inputRef.current.click();
  };

  const InputFile = () => (
    <input
      onChange={handleChange}
      data-testid="edit-input-file"
      ref={inputRef}
      type={"file"}
      hidden
      accept="image/x-png,image/gif,image/jpeg,image/png"
    />
  );
  if (imageForCheck) {
    return (
      <>
        <img
          src={imageForCheck.url}
          className={"user__selectedPhoto"}
          alt="avatar"
        />
        <div className="user__photo">
          <IconButton onClick={handleCallInputFile}>
            <PhotoIcon />
          </IconButton>
          <IconButton onClick={handleResetPhoto}>
            <RemoveIcon />
          </IconButton>
        </div>
        <InputFile />
      </>
    );
  }
  return (
    <>
      {photoUrl ? (
        <img src={photoUrl} className={"user__selectedPhoto"} alt="avatar" />
      ) : null}
      <IconButton onClick={handleCallInputFile} className="user__photo">
        <PhotoIcon />
      </IconButton>
      <InputFile />
    </>
  );
};
