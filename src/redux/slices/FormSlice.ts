import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileFormData } from '../../components/Form';
import axios from 'axios';

export const submitFormData = createAsyncThunk(
  'submitFormData',
  async (formData: ProfileFormData) => {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts${
          formData.email === 'error@example.com' ? '/error' : ''
        }`,
        formData,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

interface FormState {
  isSuccess: boolean;
  isFetching: boolean;
  error: string | null;
}

const formSlice = createSlice({
  name: 'form',
  initialState: { isSuccess: false, isFetching: false, error: null } as FormState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitFormData.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
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

export default formSlice.reducer;
