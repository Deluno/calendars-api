import { CalendarEvent } from '@/types/events';
import { LoginRequest, RegistrationRequest } from '@/types/requests';
import { LoginResponse } from '@/types/responses';
import { Calendar } from '@/types/calendars';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7097/api/',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('token') || '',
    },
  }),
  tagTypes: ['Event', 'Calendar'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user: RegistrationRequest) => ({
        url: 'Authentication/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (user: LoginRequest) => ({
        url: 'Authentication/login',
        method: 'POST',
        body: user,
      }),
    }),
    getEvents: builder.query<CalendarEvent[], void>({
      query: () => 'CalendarEvent',
      providesTags: ['Event'],
    }),
    postEvent: builder.mutation({
      query: (event) => ({
        url: 'CalendarEvent',
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Event'],
    }),
    getCalendars: builder.query<Calendar[], string>({
      query: (username: string) => ({
        url: `Calendar/${username}`,
      }),
      providesTags: ['Calendar'],
    }),
    postCalendar: builder.mutation<void, { calendar: any; username: string }>({
      query: ({ calendar, username }) => ({
        url: `Calendar/${username}`,
        method: 'POST',
        body: calendar,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetEventsQuery,
  usePostEventMutation,
  useGetCalendarsQuery,
  usePostCalendarMutation,
} = apiSlice;
