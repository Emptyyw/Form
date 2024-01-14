import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/FormSlice';
import ModalSlice from './slices/ModalSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    modal: ModalSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
