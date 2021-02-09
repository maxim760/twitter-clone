import { ModalState } from "./contracts/state";
import { Action } from "redux"

// структура : 1 енам который держит все типы, интерфейс каждой экшн и сам экшн каждый и 1 тип который все экшны содержит
// то что есть 1 енам очень классно, просто в него  все добавляем и всё!!!, не надо доп экспортов и тд  
export enum ModalActionsType {
  SET_PHOTO = "modal/SET_PHOTO",
  HIDE_PHOTO = "modal/HIDE_PHOTO",
}

export interface SetPhotoActionInterface extends Action<ModalActionsType> {
  type: ModalActionsType.SET_PHOTO;
  payload: ModalState["src"]
}
export interface HidePhotoActionInterface extends Action<ModalActionsType> {
  type: ModalActionsType.HIDE_PHOTO;
}



export const setPhoto = (payload: ModalState["src"]): SetPhotoActionInterface => ({
    type: ModalActionsType.SET_PHOTO,
    payload
})
export const hidePhoto = (): HidePhotoActionInterface => ({
    type: ModalActionsType.HIDE_PHOTO,
})


export type ModalAction = SetPhotoActionInterface | HidePhotoActionInterface ; 