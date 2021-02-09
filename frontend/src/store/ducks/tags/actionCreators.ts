import { TagsState } from "./contracts/state";
import { Action } from "redux"
import { LoadingStatus } from "../../types";

// структура : 1 енам который держит все типы, интерфейс каждой экшн и сам экшн каждый и 1 тип который все экшны содержит
// то что есть 1 енам очень классно, просто в него  все добавляем и всё!!!, не надо доп экспортов и тд  
export enum TagsActionsType {
  SET_TAGS = "tags/SET_TAGS",
  FETCH_TAGS = "tags/FETCH_TAGS",
  SET_LOADING_STATE = "tags/SET_LOADING_STATE",
}

export interface SetTagsActionInterface extends Action<TagsActionsType> {
  type: TagsActionsType.SET_TAGS;
  payload: TagsState["items"]
}
export interface SetTagsLoadingStatusActionInterface extends Action<TagsActionsType> {
  type: TagsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus
}

export interface FetchTagsActionInterface extends Action<TagsActionsType> {
  type: TagsActionsType.FETCH_TAGS;
}

export const setTags = (payload: TagsState["items"]): SetTagsActionInterface => ({
    type: TagsActionsType.SET_TAGS,
    payload
})


export const setTagsLoadingStatus = (payload: LoadingStatus ): SetTagsLoadingStatusActionInterface => ({
    type: TagsActionsType.SET_LOADING_STATE,
    payload
})

export const fetchTags = (): FetchTagsActionInterface => ({
    type: TagsActionsType.FETCH_TAGS
})


export type TagsAction = SetTagsActionInterface | SetTagsLoadingStatusActionInterface | FetchTagsActionInterface ; 