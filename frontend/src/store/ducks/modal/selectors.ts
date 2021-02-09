import {  ModalState } from "./contracts/state";
import { RootState } from "../../rootReducer";
import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
// createSelector создает мемоизированную версию селектора
export const selectModal = (state: RootState): ModalState => state.modal;

export const selectPhoto = (state: RootState) => selectModal(state).src