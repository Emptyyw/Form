import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from './ModalSlice';

export type FormInitialState = {
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  github: string;
  telegram: string;
  resume: string;
  advantages: string;
  advantages2: string;
  advantages3: string;
  about: string;
  file: File | null;
  selectedSex: string[];
  checkboxGroup: string[];
};
export interface FormState extends FormInitialState {
  isModalOpen: boolean;
  modalSuccess: boolean;
  modalMessage: string;
  isSuccess: boolean;
  isFetching: boolean;
  error: string | null;
}

export const initialFormState: FormInitialState = {
  nickname: '',
  firstName: 'Иван',
  lastName: 'Иванов',
  email: 'example@gmail.com',
  phone: '',
  github: '',
  telegram: '',
  resume: '',
  advantages: '',
  advantages2: '',
  advantages3: '',
  about: '',
  file: null,
  selectedSex: [],
  checkboxGroup: [],
};
export const initialState: FormState = {
  ...initialFormState,
  isModalOpen: false,
  modalSuccess: false,
  modalMessage: '',
  isSuccess: false,
  isFetching: false,
  error: null,
};

export const submitFormData = createAsyncThunk(
  'submitFormData',
  async (formData: FormState, { dispatch }) => {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts${
          formData.email === 'error@example.com' ? '/error' : ''
        }`,
        formData,
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
      throw error;
    }
  },
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetForm: state => {
      return { ...initialState, isSuccess: state.isSuccess };
    },
    setSuccess: state => {
      state.isSuccess = true;
    },
    updateProfileData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitFormData.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, state => {
        state.isSuccess = true;
        state.isFetching = false;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.isSuccess = false;
        state.isFetching = false;
        state.error = action.error.message || 'error';
        console.error('Error in submit', action.error);
      });
  },
});

export const { resetForm, setSuccess, updateProfileData } = formSlice.actions;

export default formSlice.reducer;
