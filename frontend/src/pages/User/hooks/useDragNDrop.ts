import React from "react";

import { preventDefault } from "../../../utils/preventDefault";
import { urlFromPhoto } from "../../../utils/urlFromPhoto";
import { ImageObj } from "../../../components/AddTweetForm";
import { useDispatch } from "react-redux";

type IDragNDrop = {
  dropFunctions?: {
    setImageCallback(arg: ImageObj | null): void;
    setIsEditModal(): void
  };
  path: string;
};

type TypeDragReturn = {
  onDragStart(e: any): void;
  onDragOver(e: any): void;
  onDragEnter(e: any): void;
  onDragLeave(e: any): void;
  onDrop(e: any): void;
};

export const useDragNDrop = ({
  dropFunctions,
  path,
}: IDragNDrop): TypeDragReturn => {
  const dispatch = useDispatch()
  const dragCount = React.useRef(0);
  const onDragStart = preventDefault;
  const onDragOver = preventDefault;
  const onDragEnter = (e: any) => {
    const target = e.target.closest(path);
    target.classList.add("active");
    dragCount.current += 1;
  };
  const onDragLeave = (e: any) => {
    const target = e.target.closest(path);
    dragCount.current -= 1;
    !dragCount.current && target.classList.remove("active");
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    const target = e.target.closest(path);
    target.classList.remove("active");

    const file = e.dataTransfer.files[0];
    if (dropFunctions) {
      dropFunctions.setImageCallback({
        url: urlFromPhoto(file),
        file,
      });
      dropFunctions.setIsEditModal()
    }

    dragCount.current = 0;
  };
  return {
    onDragStart,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
  };
};
