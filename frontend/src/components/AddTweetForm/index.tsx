import React, { MouseEvent, RefObject, MutableRefObject } from "react";

import IconButton from "@material-ui/core/IconButton";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

import { useHomeStyles } from "../../pages/Home/theme";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddTweet,
  setTweetsLoadingStatus,
  setAddFormState,
} from "../../store/ducks/tweets/actionCreators";
import { selectAddFormState } from "../../store/ducks/tweets/selectors";
import { AddFormState } from "../../store/ducks/tweets/contracts/state";
import { MessageAlert } from "..";
import { UploadImages, IImages } from "../UploadImages";
import { uploadImage } from "../../utils/uploadImage";
import { LoadingStatus } from "../../store/types";
import { getFirstChar } from "../../utils/getFirstChar";
import {
  selectUsername,
  selectUserData,
} from "../../store/ducks/user/selectors";
import { useTranslation } from "react-i18next";
import { EmojiList } from "../EmojiList";
import { AvatarUI } from "../ui/AvatarUI";

interface AddTweetProps {
  rowsMax: number;
  rows?: number;
  text?: string;
  images?: string[];
}
const maxLen = 280;
export interface ImageObj {
  url: string;
  file: File;
}
export const AddTweetForm: React.FC<AddTweetProps> = ({
  rowsMax = 10,
  rows = 1,
  text: defaultText = "",
  images: defaultImages = [],
}): React.ReactElement => {
  const classes = useHomeStyles();
  const { t } = useTranslation(["buttons"]);
  const dispatch = useDispatch();
  const addFormState = useSelector(selectAddFormState);
  const userUsername = useSelector(selectUsername);
  const userData = useSelector(selectUserData);
  const textRef = React.useRef(null);

  const [text, setText] = React.useState(defaultText);
  const [images, setImages] = React.useState<IImages>(defaultImages);
  const [visibleNotification, setVisibleNotification] = React.useState(false);
  const textLimitPercent = React.useMemo(() => {
    return (text.length / maxLen) * 100;
  }, [text]);
  const handleChangeTextarea = (
    ref:
      | ((instance: HTMLTextAreaElement | null) => void)
      | MutableRefObject<HTMLTextAreaElement | null>
      | null
  ): void => {
    if (ref !== null && "current" in ref) {
      setText(ref.current!.value);
    }
  };
  const handleCloseNotification = (): void => {
    setVisibleNotification(false);
  };
  React.useEffect(() => {
    if (addFormState === AddFormState.ERROR) {
      setVisibleNotification(true);
    }
  }, [dispatch, addFormState]);

  const handleAddTweet = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    if (text.length >= 1 && text.length <= maxLen) {
      dispatch(setAddFormState(AddFormState.LOADING));
      let urls = [];
      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        if (typeof img !== "string") {
          const file = img.file;
          const { url } = await uploadImage(file);
          urls.push(url);
        } else {
          urls.push(img);
        }
      }
      dispatch(fetchAddTweet({ text, images: urls }));
      setText("");
      setImages([]);
    } else {
      setVisibleNotification(true);
    }
  };

  return (
    <>
      <div className={classes.addFormBody}>
        <AvatarUI
          avatar={userData?.avatar}
          username={userData?.username || ""}
          className={classes.tweetAvatar}
        />
        <TextareaAutosize
          value={text}
          data-testid={"tweetArea"}
          ref={textRef}
          onChange={handleChangeTextarea.bind(null, textRef)}
          rowsMax={rowsMax}
          rows={rows}
          className={classNames(
            classes.addFormTextArea,
            text.length > maxLen && classes.areaWarning
          )}
          style={{ overflow: "auto" }}
          placeholder={t("buttons:placeholdAddTweet")}
        />
      </div>
      <div className={classes.addFormBottom}>
        <div
          className={classNames(
            classes.tweetButtons,
            classes.addFormBottomAction
          )}
        >
          <UploadImages
            images={images}
            onChangeImages={setImages}
            onChangeText={setText}
            textRef={textRef}
          />
        </div>
        <div className={classes.addFormBottomRight}>
          {text && (
            <>
              <span
                className={
                  text.length > 1 * maxLen
                    ? classes.countDisabled
                    : text.length >= 0.9 * maxLen
                    ? classes.countWarning
                    : ""
                }
              >
                {maxLen - text.length}
              </span>
              <div className={classes.addFormCircleProgress}>
                <CircularProgress
                  variant="determinate"
                  value={textLimitPercent >= 100 ? 100 : textLimitPercent}
                  thickness={4.5}
                  size={20}
                  className={text.length >= maxLen ? classes.circleWarning : ""}
                />
                <CircularProgress
                  variant="determinate"
                  size={20}
                  style={{ color: "rgba(0,0,0,0.1)" }}
                  thickness={4.5}
                  value={100}
                />
              </div>
            </>
          )}
          <Button
            className={classes.addFormButton}
            type="submit"
            data-testid="addTweet"
            disabled={
              text.length > maxLen ||
              !text.length ||
              addFormState === AddFormState.LOADING
            }
            color="primary"
            variant="contained"
            onClick={handleAddTweet}
          >
            {addFormState === AddFormState.LOADING ? (
              <CircularProgress role="loading" size={20} color="primary" />
            ) : (
              "Твитнуть"
            )}
          </Button>
        </div>
      </div>
      <MessageAlert
        open={visibleNotification}
        onClose={handleCloseNotification}
        severity="error"
        text="Ошибка при добавлении твита"
      />
    </>
  );
};
