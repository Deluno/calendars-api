import { CalendarServiceUserState, LocalStorageKeys } from '@/types/common';
import { LoginResponse } from '@/types/responses';
import { TokenPayload } from '@/types/token';
import { decodeToken } from '@/utils/token';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CalendarServiceUserState = {
  token: localStorage.getItem(LocalStorageKeys.Token) || '',
  expires: localStorage.getItem(LocalStorageKeys.Expires) || '',
  user: decodeToken(localStorage.getItem(LocalStorageKeys.Token) || ''),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: { payload: LoginResponse; type: string }) => {
      state.token = action.payload.token;
      state.expires = action.payload.expires;
    },
    setUser: (state, action: { payload: TokenPayload; type: string }) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = '';
      state.expires = '';
      state.user = { unique_name: '' };
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;
export default userSlice;
