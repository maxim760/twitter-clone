import "date-fns";
import React from "react";
import PhotoIcon from "@material-ui/icons/CameraAltOutlined";
import RemoveIcon from "@material-ui/icons/ClearOutlined";
import {
  FormGroup,
  Button,
  CircularProgress,
  Avatar,
  IconButton,
  TextareaAutosize,
  TextField,
  FormControl,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { ModalBlock } from "../../../../components";
import { urlFromPhoto } from "../../../../utils/urlFromPhoto";
import { uploadImage } from "../../../../utils/uploadImage";
import { UserApi } from "../../../../services/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addAvatar,
  addBackground,
  addPropToUserByPropName,
} from "../../../../store/ducks/user/actionCreators";
import { EditModal } from "../EditModal";
import { LoadingStatus } from "../../../../store/types";

import { useDragNDrop } from "../../hooks/useDragNDrop";
import {
  selectEditAvatar,
  selectIsEditStatus,
  selectEditAvatarUrl,
  selectEditBackground,
  selectEditBackgroundUrl,
  selectEditInfo,
  selectEditInfoOrNull,
} from "../../../../store/ducks/edit/selectors";
import {
  resetAvatarEdit,
  setAvatarEdit,
  setNotIsEdit,
  setEditModalToAvatar,
  setEditModalToBackground,
  setBackgroundEdit,
  setAvatarEditUrl,
  setBackgroundEditUrl,
  resetBackgroundEdit,
  resetAllEdit,
  setPropEditByPropName,
} from "../../../../store/ducks/edit/actionCreators";
import { ButtonsForEditUser } from "../ButtonsForEditUser";
import { ImageObj } from "../../../../components/AddTweetForm";
import {
  selectUserAvatar,
  selectUserBackground,
} from "../../../../store/ducks/user/selectors";
import { EditInput, EditInputProps } from "../EditInput";
import { IEditInfo } from "../../../../store/ducks/edit/contracts/state";
import { isUrlValid } from "../../../../utils/isUrlValid";
import { useTranslation } from "react-i18next";
import { useEditPhoto } from "../../hooks/useEditPhoto";

async function getImage(canvas: any) {
  return new Promise((resolve, reject) => {
    if (!canvas) {
      return resolve(null);
    }

    canvas.toBlob(async (blob: Blob) => {
      const { url } = await uploadImage(blob);
      resolve(url);
    });
  });
}

interface UserModalProps {
  isVisible: boolean;
  handleClose(): void;
}

type IUserKeys = keyof IEditInfo;
export const UserModal: React.FC<UserModalProps> = ({
  isVisible,
  handleClose,
}): React.ReactElement => {
  const { t } = useTranslation(["form", "buttons"]);
  const dispatch = useDispatch();
  const editBg = useEditPhoto({
    setModalForPhoto: setEditModalToBackground,
    setPhoto: setBackgroundEdit,
    resetPhoto: resetBackgroundEdit,
    setPhotoUrl: setBackgroundEditUrl,
    selectorEditPhoto: selectEditBackground,
    selectorEditCurrentUrl: selectEditBackgroundUrl,
    selectorUserCurrentUrl: selectUserBackground,
  });
  const editAvatar = useEditPhoto({
    setModalForPhoto: setEditModalToAvatar,
    setPhoto: setAvatarEdit,
    resetPhoto: resetAvatarEdit,
    setPhotoUrl: setAvatarEditUrl,
    selectorEditPhoto: selectEditAvatar,
    selectorEditCurrentUrl: selectEditAvatarUrl,
    selectorUserCurrentUrl: selectUserAvatar,
  });

  React.useEffect(() => {
    return () => {
      resetDependencies();
    };
  }, []);

  const statusIsEdit = useSelector(selectIsEditStatus);
  const [status, setStatus] = React.useState<LoadingStatus>(
    LoadingStatus.NEVER
  );

  const { ...dragEventsAvatar } = useDragNDrop({
    dropFunctions: {
      setImageCallback: editAvatar.handleSetPhoto,
      setIsEditModal: editAvatar.handleSetModalForPhoto,
    },
    path: ".user__avatar",
  });
  const { ...dragEventsBg } = useDragNDrop({
    dropFunctions: {
      setImageCallback: editBg.handleSetPhoto,
      setIsEditModal: editBg.handleSetModalForPhoto,
    },
    path: ".user__form-header",
  });

  const resetDependencies = React.useCallback(() => {
    dispatch(resetAvatarEdit());
    dispatch(resetBackgroundEdit());
    dispatch(setNotIsEdit());
    editBg.finalFileRef.current = null;
    editAvatar.finalFileRef.current = null;
  }, []);

  const handleNext = async (e: any) => {
    const validErrors: string[] = [];
    e.preventDefault();
    const objEdit: any = {};
    setStatus(LoadingStatus.LOADING);
    try {
      const formData = new FormData(e.target);
      formData.forEach((value, key: string) => {
        if (value) {
          if (key === "website") {
            if (isUrlValid(value.toString())) {
              objEdit[key] = value;
            } else {
              setStatus(LoadingStatus.NEVER);
              validErrors.push(t("form:userModal.validations.url"));
            }
          } else {
            objEdit[key] = value;
          }
        }
      });
      if (validErrors.length) {
        alert(validErrors[0]);
        setStatus(LoadingStatus.NEVER);
      } else {
        editAvatar.finalFileRef.current &&
          (await getImage(editAvatar.finalFileRef.current).then((url) => {
            if (url) {
              objEdit["avatar"] = url;
            }
          }));
        editBg.finalFileRef.current &&
          (await getImage(editBg.finalFileRef.current).then((url) => {
            if (url) {
              objEdit["background"] = url;
            }
          }));

        await UserApi.fetchAddInfoAboutUser(objEdit);
        Object.entries(objEdit).forEach(([key, value]) => {
          value &&
            dispatch(
              addPropToUserByPropName({
                prop: key as keyof IEditInfo,
                value: value as string | ImageObj,
              })
            );
        });
        setStatus(LoadingStatus.SUCCESS);
        resetDependencies();
        dispatch(resetAllEdit());
        handleClose();
      }
    } catch (e) {
      setStatus(LoadingStatus.ERROR);
      alert(t("form:status.error"));
    }
  };
  
  const editInputs: EditInputProps[] = [
    { name: "fullname", labelName: t("form:fullname"), maxLen: 50 },
    { name: "about", labelName: t("form:about"), maxLen: 160, rows: 3 },
    { name: "location", labelName: t("form:location"), maxLen: 30 },
    { name: "website", labelName: t("form:website"), maxLen: 100 },
    { name: "birthday", labelName: t("form:birthday"), type: "date", shrink: true },
  ];
  if (statusIsEdit === "avatar") {
    return (
      <EditModal
        setEditUrl={editAvatar.handleSetPhotoUrl}
        photoUrl={editAvatar.editCurrentUrl}
        isVisible={isVisible}
        handleClose={handleClose}
        imgRef={editAvatar.photoRef}
        finalPhotoFile={editAvatar.finalFileRef}
        isRound={true}
        size={{ height: 200, width: 200 }}
      />
    );
  }


  if (statusIsEdit === "background") {
    return (
      <EditModal
        setEditUrl={editBg.handleSetPhotoUrl}
        photoUrl={editBg.editCurrentUrl}
        isVisible={isVisible}
        handleClose={handleClose}
        imgRef={editBg.photoRef}
        finalPhotoFile={editBg.finalFileRef}
        size={{ height: 150, width: 450 }}
      />
    );
  }

  return (
    <ModalBlock
      title={t("buttons:changeProfile")}
      visible={isVisible}
      onClose={handleClose}
    >
      <form data-testid="user-modal" className="user__modal" onSubmit={handleNext}>
        <FormGroup aria-label="position" className="user__modal">
          <div className="user__form-header" draggable={true} {...dragEventsBg}>
            <ButtonsForEditUser
              inputRef={editBg.inputRef}
              imageForCheck={editBg.editPhoto}
              handleResetPhoto={editBg.handleResetPhoto}
              photoUrl={editBg.userCurrentUrl}
              setEditModal={editBg.handleSetModalForPhoto}
              setEditPhoto={editBg.handleSetPhoto}
            />
          </div>
          <div className="user__form-main">
            <Avatar
              component="div"
              draggable={true}
              className="user__avatar"
              {...dragEventsAvatar}
            >
              <ButtonsForEditUser
                inputRef={editAvatar.inputRef}
                imageForCheck={editAvatar.editPhoto}
                handleResetPhoto={editAvatar.handleResetPhoto}
                photoUrl={editAvatar.userCurrentUrl}
                setEditModal={editAvatar.handleSetModalForPhoto}
                setEditPhoto={editAvatar.handleSetPhoto}
              />
            </Avatar>
          </div>

          {editInputs.map((inputProps) => (
            <EditInput
              {...inputProps}
            />
          ))}

          <Button
            disabled={status === LoadingStatus.LOADING}
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
            className="user__next"
          >
            {status === LoadingStatus.LOADING ? (
              <CircularProgress size={25} />
            ) : (
              t("buttons:save")
            )}
          </Button>
        </FormGroup>
      </form>
    </ModalBlock>
  );
};
