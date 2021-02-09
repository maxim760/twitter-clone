import produce, { Draft } from "immer";
import { TweetState } from "./contracts/state";
import { TweetAction, TweetActionsType } from "./actionCreators";
import { LoadingStatus } from "../../types";
import { id } from "date-fns/locale";

const initialTweetState: TweetState = {
  data: null,
  loadingState: LoadingStatus.NEVER,
  commentModal: false,
  activeReply: null,
};

// + иммера в том, что не надо прописывать return
// и прописывают только то что изменяю, нет кучи спрэдов
export const tweetReducer = produce(
  (draft: Draft<TweetState>, action: TweetAction): void => {
    switch (action.type) {
      case TweetActionsType.SET_TWEET_DATA: {
        draft.data = action.payload;
        draft.loadingState = LoadingStatus.LOADED;
        break;
      }
      case TweetActionsType.SET_LOADING_STATE: {
        draft.loadingState = action.payload;
        break;
      }
      case TweetActionsType.FETCH_TWEET_DATA: {
        draft.data = null;
        draft.loadingState = LoadingStatus.LOADING;
        break;
      }
      case TweetActionsType.CLEAR_TWEET_DATA: {
        draft.data = null;
        break;
      }
      case TweetActionsType.OPEN_COMMENT_MODAL: {
        draft.commentModal = true;
        break;
      }
      case TweetActionsType.CLOSE_COMMENT_MODAL: {
        draft.commentModal = false;
        break;
      }
      case TweetActionsType.SET_ACTIVE_REPLY: {
        draft.activeReply = action.payload;
        break;
      }
      case TweetActionsType.ADD_COMMENT: {
        
        if (draft.data) {
          if (!draft.data.comments) {
            draft.data.comments = {count: 0, comments: []};
          }
          draft.data.comments.comments.push(action.payload);
          draft.data.comments.count++
        }
        break;
      }
      case TweetActionsType.FETCH_EDIT_COMMENT: {
        const { _id, text, images } = action.payload;
        if (draft.data?.comments.comments) {
          console.log(_id)
          console.log(action.payload)
          console.log(draft.data.comments)
          const index = draft.data.comments.comments.findIndex((com) => com._id === _id);
          if (index > -1) {
            console.log(index)
            console.log(draft.data.comments.comments[index])
            draft.data.comments.comments[index].text = text;
            draft.data.comments.comments[index].images = images || [];
          }
        }
        break;
      }
      case TweetActionsType.FETCH_REMOVE_COMMENT: {
        if (draft.data?.comments.comments) {
          draft.data.comments.comments = draft.data.comments.comments.filter(
            (com) => com._id !== action.payload
          );
        }
        break;
      }
      default:
        const x: never = action;
    }
  },
  initialTweetState
);

// export type tweetsType = ReturnType<typeof tweetsReducer>
// пригодился если бы не юзали селекторы
