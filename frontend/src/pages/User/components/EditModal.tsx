import React from "react";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import { Slider } from "@material-ui/core";
import AvatarEditor from "react-avatar-editor";

import { ModalBlock } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { setAvatarEditUrl, setNotIsEdit } from "../../../store/ducks/edit/actionCreators";
import { selectEditAvatarUrl } from "../../../store/ducks/edit/selectors";
import { ImageObj } from "../../../components/AddTweetForm";
import { useTranslation } from "react-i18next";

interface ISize {
  width: number;
  height: number;
}

interface EditModalProps {
  handleClose: () => void;
  setEditUrl(payload: string): void
  isVisible: boolean;
  isRound?: boolean;
  size: ISize;
  photoUrl: string | null;
  imgRef: any;
  finalPhotoFile: any;
}

export const EditModal: React.FC<EditModalProps> = ({
  isVisible,
  handleClose,
  isRound = false,
  photoUrl,
  size,
  imgRef,
  finalPhotoFile,
  setEditUrl
}): React.ReactElement => {
  const {t} = useTranslation(['buttons']) 
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      setScaleAvatar(1);
    };
  }, []);
  const [scaleAvatar, setScaleAvatar] = React.useState(1);

  const handleChangeSize = (event: any, newValue: number | number[]) => {
    setScaleAvatar(newValue as number);
  };
  const handleClickSave = () => {
    if (imgRef.current) {
      dispatch(
        setEditUrl(imgRef.current.getImageScaledToCanvas().toDataURL())
      );
      //@ts-ignore
      finalPhotoFile.current = imgRef.current.getImageScaledToCanvas();
      dispatch(setNotIsEdit());
    }
  };

  return (
    <ModalBlock
      apply={true}
      applyTitle={t("buttons:apply")}
      title={t("buttons:editPhoto")}
      visible={isVisible}
      onClose={handleClose}
      onApply={handleClickSave}
    >
      <div data-testid="edit-modal" className="user__modal">
        <div className="user__form-main--edit">
          <AvatarEditor
            ref={imgRef}
            image={photoUrl || ""}
            width={size.width}
            height={size.height}
            border={20}
            borderRadius={isRound ? size.width : 0}
            style={{
              backgroundColor: "#8E7CF4",
              border: "5px solid #8E7CF4",
            }}
            className="user__finalAvatar"
            scale={scaleAvatar}
          />
        </div>

        <div className="user__sliderWrapper">
          <ZoomOutIcon />
          <Slider
            className={"user__slider"}
            value={scaleAvatar}
            min={1}
            max={6}
            step={0.01}
            onChange={handleChangeSize}
            aria-labelledby="continuous-slider"
          />
          <ZoomInIcon />
        </div>
      </div>
    </ModalBlock>
  );
};
