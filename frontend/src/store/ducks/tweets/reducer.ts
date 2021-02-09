import produce, { Draft, original, current } from "immer";
import { TweetsState, AddFormState } from "./contracts/state";
import { TweetsAction } from "./actionCreators";
import { TweetsActionsType } from "./contracts/action";
import { LoadingStatus } from "../../types";

const initialTweetsState: TweetsState = {
  items: [],
  page: 1,
  loadingState: LoadingStatus.NEVER,
  addFormState: AddFormState.NEVER,
  removingState: LoadingStatus.NEVER,
};

// + иммера в том, что не надо прописывать return
// и прописывают только то что изменяю, нет кучи спрэдов
export const tweetsReducer = produce(
  (draft: Draft<TweetsState>, action: TweetsAction): void => {
    switch (action.type) {
      case TweetsActionsType.SET_TWEETS: {
        draft.items.push(...action.payload);
        draft.page++;
        draft.loadingState = LoadingStatus.LOADED;
        break;
      }
      case TweetsActionsType.SET_LOADING_STATE: {
        draft.loadingState = action.payload;
        break;
      }
      case TweetsActionsType.FETCH_TWEETS: {
        draft.loadingState = LoadingStatus.LOADING;
        break;
      }
      case TweetsActionsType.ADD_TWEET: {
        draft.items.unshift(action.payload);
        draft.addFormState = AddFormState.NEVER;
        break;
      }
      case TweetsActionsType.FETCH_ADD_TWEET: {
        draft.addFormState = AddFormState.LOADING;
        break;
      }
      case TweetsActionsType.REMOVE_TWEET: {
        draft.removingState = LoadingStatus.NEVER;
        draft.items.splice(
          draft.items.findIndex((item) => item._id === action.payload),
          1
        );
        break;
      }
      case TweetsActionsType.FETCH_REMOVE_TWEET: {
        draft.removingState = LoadingStatus.LOADING;
        break;
      }
      case TweetsActionsType.SET_ADD_FORM_STATE: {
        draft.addFormState = action.payload;
        break;
      }
      case TweetsActionsType.SET_REMOVING_STATE: {
        draft.removingState = action.payload;
        break;
      }
      case TweetsActionsType.ADD_COMMENT_TO_TWEETS: {
        console.log("add2")
        console.log(action.payload)
        console.log(draft.items.map(item => item._id))

        draft.items[draft.items.findIndex(item => item._id === action.payload)].comments.count += 1
        break;
      }
      case TweetsActionsType.REMOVE_COMMENT_FROM_TWEETS: {
        draft.items[draft.items.findIndex(item => item._id === action.payload)].comments.count--
        break;
      }
      default:
        const x: never = action;
        break;
    }
  },
  initialTweetsState
);

// export type tweetsType = ReturnType<typeof tweetsReducer>
// пригодился если бы не юзали селекторы
