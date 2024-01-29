import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserInfo } from '../../types/Types';

export interface ProfileState {
  userInfo: UserInfo;
}

export const initialProfileState: ProfileState = {
  userInfo: {
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
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    radio1: false,
    radio2: false,
    radio3: false,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    updateProfileInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  },
});

export const { updateProfileInfo } = profileSlice.actions;

export default profileSlice.reducer;
