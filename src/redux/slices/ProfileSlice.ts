import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../types/Types';

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
    checkboxGroup: [],
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    updateProfileInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      console.log('Обновление информации профиля:', action.payload);

      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  },
});

export const { updateProfileInfo } = profileSlice.actions;

export default profileSlice.reducer;
