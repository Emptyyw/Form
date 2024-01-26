import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from '../store';
import { type UserInfo } from '../../types/Types';
import { initialProfileState } from './ProfileSlice';
import { modals } from '@mantine/modals';

export const setFormToInitialState = createAction('setFormToInitialState');
export const redirect = createAction('redirect');
export interface FormInitialState extends UserInfo {
  isModalOpen: boolean;
  modalSuccess: boolean;
  modalMessage: string;
  isSuccess: boolean;
  isFetching: boolean;
  error: string | null;
  profileData: null;
  formData: null;
}

export const initialState: FormInitialState = {
  ...initialProfileState.userInfo,
  isModalOpen: false,
  modalSuccess: false,
  modalMessage: '',
  isSuccess: false,
  isFetching: false,
  error: null,
  profileData: null,
  formData: null,
};

export const submitFormData = createAsyncThunk(
  'submitFormData',
  async (userInfo: UserInfo, { dispatch }) => {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts${
          userInfo.email === 'error@example.com' ? '/error' : ''
        }`,
        userInfo,
      );
      modals.openConfirmModal({
        title: 'Успех!',
        children: 'Форма успешно отправлена.',
        labels: { confirm: 'ОК', cancel: 'Отмена' },
        onConfirm: () => {
          dispatch(setSuccess());
          dispatch(redirect());
        },
        onCancel: () => {
          dispatch(resetForm());
          dispatch(redirect());
        },
      });
      return response.data;
    } catch (error) {
      modals.openConfirmModal({
        title: 'Ошибка!',
        children: 'Что-то пошло не так.',
        labels: { confirm: 'ОК', cancel: 'Отмена' },
        onConfirm: () => {
          dispatch(resetForm());
        },
      });
      console.error('Error in submit', error);
      dispatch(setFormToInitialState());
      throw error;
    }
  },
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSuccess: (state) => {
      return { ...state, isSuccess: true };
    },
    updateProfileData: (state, action) => {
      state.formData = action.payload;
      if (!state.isSuccess) {
        state.formData = initialState.formData;
      }
    },
    resetForm: (state) => {
      return {
        ...state,
        formData: initialState.formData,
      };
    },
    redirect: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormData.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isFetching = false;
        state.profileData = action.payload.updatedProfileData;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.isSuccess = false;
        state.isFetching = false;
        state.error = action.error.message || 'error';
        state.formData = initialState.formData;
      });
  },
});

export const selectFormData = (state: RootState) => state.form;

export const { setSuccess, updateProfileData, resetForm } = formSlice.actions;

export default formSlice.reducer;
