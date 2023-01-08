import { Calendar, SelectableCalendar } from '@/types/calendars';
import { CalendarServiceSelectedCalendarsState } from '@/types/common';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState: CalendarServiceSelectedCalendarsState = {
  calendars: {},
  savedCalendars: {},
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
      state.calendars = action.payload.calendars.reduce((acc, calendar) => {
        acc[calendar.id!] = {
          ...calendar,
          selected: action.payload.checked,
        };
        return acc;
      }, {} as { [key: number]: SelectableCalendar });
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
      state.savedCalendars = action.payload.calendars.reduce(
        (acc, calendar) => {
          acc[calendar.id!] = {
            ...calendar,
            selected: action.payload.checked,
          };
          return acc;
        },
        {} as { [key: number]: SelectableCalendar },
      );
    },
    toggleSavedCalendar: (state, action: { payload: number; type: string }) => {
      state.savedCalendars[action.payload].selected =
        !state.savedCalendars[action.payload].selected;
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
  toggleSavedCalendar,
  setDate,
} = calendarsSlice.actions;
export default calendarsSlice;
