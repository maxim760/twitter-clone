import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EmojiIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import { Picker } from "emoji-mart";
//@ts-ignore
import "emoji-mart/css/emoji-mart.css";
import { EmojiData } from "emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index";
import { TCallbackText } from "../UploadImages";
import { getCursorPosition } from "../../utils/getCursorPosition";
import { getActiveLng } from "../../utils/getActiveLng";
import { localeEmojies } from "./localeEmojies";
import { setCursorPosition } from "../../utils/setCursorPosition";
import { useTranslation } from "react-i18next";

interface EmojiListProps {
  handleChangeText: TCallbackText;
  textRef: any;
  position?: "top" | "bottom";
}
const style: React.CSSProperties = {
  position: "absolute",
  zIndex: 99999999999,
  left: "50%",
  transform: "translateX(-50%)",
};

export const EmojiList: React.FC<EmojiListProps> = ({
  handleChangeText,
  textRef,
  position = "top",
}): React.ReactElement => {
  React.useEffect(() => {
    document.body.addEventListener("click", handleCloseEmojiModal);
    return () => {
      document.body.removeEventListener("click", handleCloseEmojiModal);
    };
  }, []);
  const { t } = useTranslation(["title"]);
  const activeLng = getActiveLng();
  const [isVisibleEmoji, setIsVisibleEmoji] = React.useState(false);
  const handleToggleEmojiModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisibleEmoji((prev) => !prev);
  };
  const handleCloseEmojiModal = (e: any) => {
    // у addEventListenr handleCLoseEmojiModal тип mouseEvent, а в типе mouseEvent у таргета нет клозеста и не типизауция выдает ошибку
    if (e.target.closest(".emoji-mart") === null && e.target.closest(".emojiButton") === null) {
      setIsVisibleEmoji(false);
    }
  };
  const handleStopHidePicker = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const addEmoji = (selectedEmoji: EmojiData & { unified: any }) => {
    const sym = selectedEmoji.unified.split("-");
    const codesArray = sym.map((item: any) => `0x${item}`);
    const emoji = String.fromCodePoint(...codesArray);
    const position = getCursorPosition(textRef.current);
    handleChangeText((prev) => {
      return prev.slice(0, position) + emoji + prev.slice(position);
    });
    setCursorPosition(textRef.current, position + 2); // эмодзи занимает 2 символа, поэтому + 2
  };
  return (
    <div style={{ position: "relative" }}>
      <IconButton color="primary" className={"emojiButton"} onClick={handleToggleEmojiModal}>
        <EmojiIcon style={{ fontSize: 26 }} />
      </IconButton>
      {isVisibleEmoji && (
        <Picker
          onSelect={addEmoji}
          onClick={(_, event) => handleStopHidePicker(event)}
          style={{ ...style, [position]: "calc(100% + 5px)" }}
          exclude={["flags"]}
          native={true}
          set={"twitter"}
          i18n={localeEmojies[activeLng]}
          color={"rgb(29,161,242)"}
          title={t("title:emoji")}
          emoji={"globe_with_meridians"}
        />
      )}
    </div>
  );
};
