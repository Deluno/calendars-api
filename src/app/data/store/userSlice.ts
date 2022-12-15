import { CalendarServiceUserState, LocalStorageKeys } from '@/types/common';
import { LoginResponse } from '@/types/responses';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CalendarServiceUserState = {
  token: localStorage.getItem(LocalStorageKeys.Token) || '',
  expires: localStorage.getItem(LocalStorageKeys.Expires) || undefined,
  isAuthenticated: !!localStorage.getItem(LocalStorageKeys.Token),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: LoginResponse; type: string }) => {
      state.token = action.payload.token;
      state.expires = action.payload.expires;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = '';
      state.expires = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice;
