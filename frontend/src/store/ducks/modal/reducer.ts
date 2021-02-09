import produce, { Draft } from "immer";
import { ModalState } from "./contracts/state";
import { ModalActionsType, ModalAction } from "./actionCreators";

const initialModalState: ModalState = {
  src: null,
};

// + иммера в том, что не надо прописывать return
// и прописывают только то что изменяю, нет кучи спрэдов
export const modalReducer = produce(
  (draft: Draft<ModalState>, action: ModalAction): void => {
    switch (action.type) {
      case ModalActionsType.SET_PHOTO: {
        draft.src = action.payload;
        break;
      }
      case ModalActionsType.HIDE_PHOTO: {
        draft.src = null;
        break;
      }
      default:
        const x: never = action;
        break;
    }
  },
  initialModalState
);

// export type tweetsType = ReturnType<typeof tweetsReducer>
// пригодился если бы не юзали селекторы
