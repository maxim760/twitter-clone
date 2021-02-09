import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { selectPhoto } from "../store/ducks/modal/selectors";
import { useDispatch, useSelector } from "react-redux";
import { hidePhoto } from "../store/ducks/modal/actionCreators";
import { calcScroll } from "../utils/calcScroll";

export const ModalPhoto: React.FC = () => {
  const dispatch = useDispatch();
  const url = useSelector(selectPhoto);
  const parentElem = document.querySelector("#root");
  const rootContainer = document.createElement("div");
  const notClosePhoto = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();
  React.useLayoutEffect(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const isHide = scrollHeight > clientHeight; // нужно ли скрывать скролл
    const modalAddTweet: HTMLElement | null = document.querySelector(".modal-add-tweet")
    if (isHide) {
      const scrollWidth = calcScroll();
      document.body.style.marginRight = `${scrollWidth}px`;
      if (modalAddTweet) {
        modalAddTweet.style.marginRight = `${scrollWidth}px`;
      }
    }
    document.body.style.overflowY = "hidden";
    return () => {
      if (isHide) {
        document.body.style.marginRight = "0";
        if (modalAddTweet) {
          modalAddTweet.style.marginRight = `0`;
        }
      }
      document.body.style.overflowY = "auto";
    };
  }, []);
  const closePhoto = () => {
    document.querySelector(".overlay")?.classList.add("hidden");
    setTimeout(() => {
      dispatch(hidePhoto());
    }, 700);
  };
  React.useLayoutEffect(() => {
    if (typeof window !== "undefined" && parentElem) {
      parentElem.appendChild(rootContainer);
    }
    return () => {
      if (parentElem && document.querySelector(".overlay")) {
        parentElem.removeChild(rootContainer);
      }
    };
  }, []);

  if (!rootContainer) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={"overlay"} onClick={closePhoto}>
      <div className="modal" onClick={notClosePhoto}>
        <img src={url!} alt="photo" />
        <IconButton className="close" onClick={closePhoto}>
          <CloseIcon style={{ fill: "red" }} />
        </IconButton>
      </div>
    </div>,
    rootContainer
  );
};
