import { Calendar, SelectableCalendar } from '@/types/calendars';
import { CalendarServiceSelectedCalendarsState } from '@/types/common';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState: CalendarServiceSelectedCalendarsState = {
  calendars: {},
  selectedDate: moment().toISOString(),
};

const calendarsSlice = createSlice({
  name: 'calendars',
  initialState,
  reducers: {
    setCalendars: (
      state,
      action: {
        payload: { calendars: Calendar[]; checked: boolean };
        type: string;
      },
    ) => {
      const selectableCalendars = action.payload.calendars.reduce(
        (acc, calendar) => {
          acc[calendar.id!] = {
            ...calendar,
            selected: action.payload.checked,
            saved: false,
          };
          return acc;
        },
        {} as { [key: number]: SelectableCalendar },
      );
      state.calendars = { ...state.calendars, ...selectableCalendars };
    },
    toggleCalendar: (state, action: { payload: number; type: string }) => {
      state.calendars[action.payload].selected =
        !state.calendars[action.payload].selected;
    },
    setSavedCalendars: (
      state,
      action: {
        payload: { calendars: Calendar[]; checked: boolean };
        type: string;
      },
    ) => {
      const selectableCalendars = action.payload.calendars.reduce(
        (acc, calendar) => {
          acc[calendar.id!] = {
            ...calendar,
            selected: action.payload.checked,
            saved: true,
          };
          return acc;
        },
        {} as { [key: number]: SelectableCalendar },
      );
      state.calendars = { ...state.calendars, ...selectableCalendars };
    },
    resetCalendars: (state) => {
      state.calendars = {};
    },
    setDate: (state, action: { payload: string; type: string }) => {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  setCalendars,
  toggleCalendar,
  setSavedCalendars,
  resetCalendars,
  setDate,
} = calendarsSlice.actions;
export default calendarsSlice;
