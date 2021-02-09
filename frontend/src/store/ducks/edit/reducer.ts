import produce, { Draft } from "immer";
import { EditState } from "./contracts/state";
import { EditAction, EditActionsType } from "./actionCreators";
import { LoadingStatus } from "../../types";
import { WritableDraft } from "immer/dist/internal";

const initialEditState: EditState = {
  info: {
    avatar: null,
    background: null,
    about: null,
    website: null,
    birthday: null,
    location: null,
    fullname: null,
  },
  status: null,
};

// + иммера в том, что не надо прописывать return
// и прописывают только то что изменяю, нет кучи спрэдов
export const editReducer = produce(
  (draft: Draft<EditState>, action: EditAction): void => {
    switch (action.type) {
      case EditActionsType.RESET_ALL: {
        draft.info.about = null;
        draft.info.avatar = null;
        draft.info.background = null;
        draft.info.birthday = null;
        draft.info.location = null;
        draft.info.fullname = null;
        draft.info.website = null;
        break;
      }
      case EditActionsType.RESET_AVATAR: {
        draft.info.avatar = null;
        break;
      }
      case EditActionsType.SET_AVATAR: {
        draft.info.avatar = action.payload;
        break;
      }
      case EditActionsType.SET_AVATAR_URL: {
        if (draft.info.avatar) {
          draft.info.avatar.url = action.payload;
        }
        break;
      }
      case EditActionsType.RESET_ABOUT: {
        draft.info.about = null;
        break;
      }
      case EditActionsType.SET_ABOUT: {
        draft.info.about = action.payload;
        break;
      }
      case EditActionsType.RESET_BACKGROUND: {
        draft.info.background = null;
        break;
      }
      case EditActionsType.SET_BACKGROUND: {
        draft.info.background = action.payload;
        break;
      }
      case EditActionsType.SET_BACKGROUND_URL: {
        if (draft.info.background) {
          draft.info.background.url = action.payload;
        }
        break;
      }
      case EditActionsType.RESET_BIRTHDAY: {
        draft.info.birthday = null;
        break;
      }
      case EditActionsType.SET_BIRTHDAY: {
        draft.info.birthday = action.payload;
        break;
      }
      case EditActionsType.RESET_WEBSITE: {
        draft.info.website = null;
        break;
      }
      case EditActionsType.SET_WEBSITE: {
        draft.info.website = action.payload;
        break;
      }
      case EditActionsType.RESET_LOCATION: {
        draft.info.location = null;
        break;
      }
      case EditActionsType.SET_LOCATION: {
        draft.info.location = action.payload;
        break;
      }
      case EditActionsType.RESET_FULLNAME: {
        draft.info.fullname = null;
        break;
      }
      case EditActionsType.SET_FULLNAME: {
        draft.info.fullname = action.payload;
        break;
      }
      case EditActionsType.SET_NOT_IS_EDIT: {
        draft.status = null;
        break;
      }
      case EditActionsType.SET_EDIT_BACKGROUND: {
        draft.status = "background";
        break;
      }
      case EditActionsType.SET_EDIT_AVATAR: {
        draft.status = "avatar";
        break;
      }
      case EditActionsType.SET_PROP_EDIT: {
        const { prop, value } = action.payload
        if (prop in draft.info && value) {
          // @ts-ignore
          draft.info[prop] = value;
        }
        break;
      }

      default:
        const x: never = action;
        break;
    }
  },
  initialEditState
);

// export type tweetsType = ReturnType<typeof tweetsReducer>
// пригодился если бы не юзали селекторы
