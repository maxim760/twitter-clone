import React from "react";
import { ImageObj } from "./AddTweetForm";
import mediumZoom from "medium-zoom";
import { ModalPhoto } from "./ModalPhoto";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto, hidePhoto } from "../store/ducks/modal/actionCreators";
import { selectPhoto } from "../store/ducks/modal/selectors";

interface ImageListProps {
  images: string[];
  removePhoto?: (url: string) => void;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  removePhoto,
}): React.ReactElement | null => {
  const dispatch = useDispatch();

  const showModal = useSelector(selectPhoto);

  React.useEffect(() => {
    return () => {
      dispatch(hidePhoto());
    };
  }, []);

  if (!images.length) {
    return null;
  }

  const toggleShowPhoto = (
    event: React.MouseEvent<HTMLImageElement>,
    url: string
  ) => {
    dispatch(setPhoto(url));
  };
  return (
    <div>
      {images.map((url) => (
        <div
          style={{ position: "relative", display: "inline" }}
          key={url}
        >
          <img
            onClick={(event) => toggleShowPhoto(event, url)}
            className="load-img"
            src={url}
            alt={"photo"}
          />
          {removePhoto && (
            <button
              onClick={removePhoto.bind(null, url)}
              style={{
                position: "absolute",
                right: 5,
                border: 0,
                background: "none",
                cursor: "pointer",
                padding: 0,
                color: "rgba(255,0,0,0.6)",
              }}
            >
              x
            </button>
          )}
          {showModal === url && <ModalPhoto />}
        </div>
      ))}
    </div>
  );
};
