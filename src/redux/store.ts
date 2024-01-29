import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/FormSlice';
import modalReducer from './slices/ModalSlice';
import profileReducer from './slices/ProfileSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
