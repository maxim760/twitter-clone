import { EditState, IEditInfo, IEditStatus } from "./contracts/state";
import { RootState } from "../../rootReducer";
export const selectEdit = (state: RootState): EditState => state.edit;
export const selectEditInfo = (state: RootState): IEditInfo  => selectEdit(state).info
export const selectEditInfoOrNull = (state: RootState): IEditInfo | null => {
  const info = selectEditInfo(state)
  const isAllNullValues = Object.values(info).some(val => val !== null)
  if(isAllNullValues) {
    return null
  } else {
    return info
  }
};

export const selectIsEditStatus = (state: RootState): IEditStatus => selectEdit(state).status;

export const selectEditAbout = (state: RootState) => selectEditInfo(state).about
export const selectEditAvatar = (state: RootState) => selectEditInfo(state).avatar
export const selectEditAvatarUrl = (state: RootState) => {
  const avatar = selectEditAvatar(state)
  return !!avatar ? avatar.url : null
}
export const selectEditBackground = (state: RootState) => selectEditInfo(state).background
export const selectEditBackgroundUrl = (state: RootState) => {
  const bg = selectEditBackground(state)
  return !!bg ? bg.url : null
}
export const selectEditBirthday = (state: RootState) => selectEditInfo(state).birthday
export const selectEditFullname = (state: RootState) => selectEditInfo(state).fullname
export const selectEditLocation = (state: RootState) => selectEditInfo(state).location
export const selectEditWebsite = (state: RootState) => selectEditInfo(state).website
export const selectEditNeededProp = (prop: keyof IEditInfo) => (state: RootState) => {
  const info = selectEditInfo(state)
  if (prop in info) {
    return info[prop]
  }
  return null
}

