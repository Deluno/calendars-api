import {
  CalendarEventPostRequest,
  CalendarTaskPostRequest,
  LoginRequest,
  RegistrationRequest,
} from '@/types/requests';
import {
  CalendarEntityResponse as CalendarEventResponse,
  LoginResponse,
  UserResponse,
  UserWithCalendarsResponse,
} from '@/types/responses';
import { Calendar } from '@/types/calendars';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/data/store';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7097/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Task', 'Event', 'Calendar', 'User'],
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
    getEvents: builder.query<CalendarEventResponse[], void>({
      query: () => 'CalendarEvent',
      transformResponse: (response: CalendarEventResponse[]) => {
        return response.map((event) => ({
          ...event,
          type: 'event',
        }));
      },
      providesTags: ['Event'],
    }),
    postEvent: builder.mutation({
      query: (event: CalendarEventPostRequest) => ({
        url: 'CalendarEvent',
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Event'],
    }),
    getTasks: builder.query<CalendarEventResponse[], void>({
      query: () => 'CalendarTask',
      transformResponse: (response: CalendarEventResponse[]) => {
        return response.map((task) => ({
          ...task,
          type: 'task',
        }));
      },
      providesTags: ['Task'],
    }),
    postTask: builder.mutation({
      query: (task: CalendarTaskPostRequest) => ({
        url: 'CalendarTask',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    getCalendars: builder.query<
      Calendar[],
      { username: string; saved?: boolean }
    >({
      query: ({ username, saved = false }) => ({
        url: `Calendar?username=${username}&subscribed=${saved}`,
      }),
      providesTags: ['Calendar'],
    }),
    postCalendar: builder.mutation<void, Calendar>({
      query: (calendar) => ({
        url: `Calendar`,
        method: 'POST',
        body: calendar,
      }),
      invalidatesTags: ['Calendar'],
    }),
    getUsers: builder.query<UserResponse[], string>({
      query: (username: string) => `AppUser?username=${username}`,
      providesTags: ['User'],
    }),
    getUsersWithCalendars: builder.query<UserWithCalendarsResponse[], string>({
      query: (username: string) =>
        `AppUser?username=${username}&includeCalendars=true`,
      keepUnusedDataFor: 5,
      providesTags: ['User'],
    }),
    deleteCalendar: builder.mutation<void, number>({
      query: (id) => ({
        url: `Calendar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Calendar', 'Event'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetEventsQuery,
  usePostEventMutation,
  useGetTasksQuery,
  usePostTaskMutation,
  useGetCalendarsQuery,
  usePostCalendarMutation,
  useGetUsersQuery,
  useGetUsersWithCalendarsQuery,
  useDeleteCalendarMutation,
} = apiSlice;
