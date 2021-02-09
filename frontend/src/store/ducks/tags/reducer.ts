import produce, { Draft } from "immer";
import { TagsState } from "./contracts/state";
import { TagsAction, TagsActionsType } from "./actionCreators";
import { LoadingStatus } from "../../types";

const initialTags = [
  { name: "Навальный", _id: "1", count: 52321 },
  { name: "Москва", _id: "2", count: 4277 },
  { name: "3 волна", _id: "3", count: 9213 },
];

const initialTagsState: TagsState = {
  items: initialTags || [],
  loadingState: LoadingStatus.NEVER,
};

// + иммера в том, что не надо прописывать return
// и прописывают только то что изменяю, нет кучи спрэдов
export const tagsReducer = produce(
  (draft: Draft<TagsState>, action: TagsAction): void => {
    switch (action.type) {
      case TagsActionsType.SET_TAGS: {
        if (action.payload) draft.items = action.payload;
        draft.loadingState = LoadingStatus.LOADED;
        break;
      }
      case TagsActionsType.SET_LOADING_STATE: {
        draft.loadingState = action.payload;
        break;
      }
      case TagsActionsType.FETCH_TAGS: {
        if (!draft.items) draft.items = [];
        draft.loadingState = LoadingStatus.LOADING;
        break;
      }
      default:
        const x: never = action;
        break;
    }
  },
  initialTagsState
);

// export type tweetsType = ReturnType<typeof tweetsReducer>
// пригодился если бы не юзали селекторы
