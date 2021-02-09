import { ImageObj } from "../../../../components/AddTweetForm";

export interface IEditInfo {
  avatar: ImageObj | null
  background: ImageObj | null
  about: string | null
  website: string | null
  birthday: string | null
  location: string | null
  fullname: string | null
}

export type IEditStatus =  "avatar" | "background" | null
export interface EditState {
  info: IEditInfo,
  status: IEditStatus
}