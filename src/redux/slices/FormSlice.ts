import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from './ModalSlice';
import { RootState } from '../store';
import { UserInfo } from '../../types/Types';
import { initialProfileState } from './ProfileSlice';

export const setFormToInitialState = createAction('setFormToInitialState');

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
      dispatch(
        openModal({
          success: true,
          message: 'Форма успешно отправлена.',
        }),
      );
      return response.data;
    } catch (error) {
      dispatch(
        openModal({
          success: false,
          message: 'Что-то пошло не так.',
        }),
      );
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
    setSuccess: state => {
      return { ...state, isSuccess: true };
    },
    updateProfileData: (state, action) => {
      state.formData = action.payload;
      if (state.isSuccess === false) {
        state.formData = initialState.formData;
      }
    },
    resetForm: state => {
      return {
        ...state,
        formData: initialState.formData,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitFormData.pending, state => {
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
      });
  },
});

export const selectFormData = (state: RootState) => state.form;

export const { setSuccess, updateProfileData } = formSlice.actions;

export default formSlice.reducer;
