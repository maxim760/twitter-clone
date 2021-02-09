import { LoadingStatus } from "../../../types";

export interface Tag {
  name: string,
  count: number,
  _id: string
}

export interface TagsState {
  items: Tag[],
  loadingState: LoadingStatus

}