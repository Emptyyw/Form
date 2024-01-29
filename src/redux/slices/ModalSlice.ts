import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ModalState {
  isModalOpen: boolean
  modalSuccess: boolean | string
  modalMessage: string
}

const initialModalState: ModalState = {
  isModalOpen: false,
  modalSuccess: false,
  modalMessage: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<{ success: boolean, message: string }>) => {
      state.isModalOpen = true;
      state.modalSuccess = action.payload.success;
      state.modalMessage = action.payload.message;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
export const selectIsModalOpen = (state: RootState) => state.modal.isModalOpen;
export const selectModalSuccess = (state: RootState) => state.modal.modalSuccess;
export const selectModalMessage = (state: RootState) => state.modal.modalMessage;
