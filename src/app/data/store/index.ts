import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/app/data/source/api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userSlice from '@/app/data/store/userSlice';
import calendarsSlice from '@/app/data/store/calendarsSlice';

const store = configureStore({
  reducer: {
    calendarState: calendarsSlice.reducer,
    userState: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
