import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EmojiIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { ImageObj } from "./AddTweetForm";
import { ImageList } from "./ImageList";
import { EmojiList } from "./EmojiList";
import { urlFromPhoto } from "../utils/urlFromPhoto";

export type IImages = Array<ImageObj | string>;

type TCallback = (callback: (prev: IImages) => IImages) => void;
export type TCallbackText = (callback: (prev: string) => string) => void;

interface UploadImagesProps {
  images: IImages;
  onChangeImages: TCallback;
  onChangeText: TCallbackText;
  textRef: any;
  position?: "top" | "bottom";
}

export const UploadImages: React.FC<UploadImagesProps> = ({
  images,
  onChangeImages,
  onChangeText,
  textRef,
  position = "top",
}): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClickUpload: () => void = () => {
    if (inputRef !== null && "current" in inputRef) {
      (inputRef.current as any).click();
    }
  };

  const imagesArray = images.map(img => {
    console.log(img, "img")
    if (typeof img === "string") {
      return img
    }
    return img.url
  })
  console.log(images, "imagag")
  console.log(imagesArray)

  const removePhoto = (url: string) => {
    onChangeImages((prev: IImages) =>
      prev.filter((item) => ((item as ImageObj).url || item) !== url)
    );
  };

  const handleChangeFileInput = React.useCallback((event: any) => {
    if (event.target) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];

        const fileUrl: string = urlFromPhoto(file);
        if (fileUrl) {
          onChangeImages((prev: IImages) => [
            ...prev,
            { file, url: fileUrl },
          ]);
        }
      }
    }
  }, []);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("change", handleChangeFileInput);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("change", handleChangeFileInput);
      }
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="primary"
          style={{ overflow: "hidden" }}
          onClick={handleClickUpload}
        >
          <ImageOutlinedIcon style={{ fontSize: 26 }} />
        </IconButton>
        <EmojiList
          position={position}
          handleChangeText={onChangeText}
          textRef={textRef}
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        name="image"
        id="load-file"
        hidden
        multiple
      />
      <ImageList
        images={imagesArray}
        removePhoto={removePhoto}
      />
    </div>
  );
};
